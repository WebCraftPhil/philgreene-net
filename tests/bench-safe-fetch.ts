import assert from 'node:assert/strict'
import http from 'node:http'
import { LookupAddress, LookupOptions } from 'node:dns'
import promisesDns from 'node:dns/promises'
import { safeFetchHtml } from '../server/scanner/safe-fetch'

async function runBenchmark() {
  let dnsLookupCount = 0
  const originalLookup = promisesDns.lookup

  // Mock dns.lookup to track DNS calls and return a public IP for 'bench.local'
  const publicTestIp = '93.184.216.34' // example.com public IP
  promisesDns.lookup = (async (hostname: string, options?: LookupOptions) => {
    dnsLookupCount++
    if (hostname === 'bench.local') {
      if (typeof options === 'object' && options?.all) {
        return [{ address: publicTestIp, family: 4 }] as LookupAddress[]
      }
      return { address: publicTestIp, family: 4 } as LookupAddress
    }
    return originalLookup(hostname, options as LookupOptions)
  }) as typeof promisesDns.lookup

  let serverPort = 0
  const server = http.createServer((req, res) => {
    if (req.url === '/step1') {
      res.writeHead(302, { location: 'http://bench.local/step2' })
      res.end()
    } else if (req.url === '/step2') {
      res.writeHead(302, { location: 'http://bench.local/step3' })
      res.end()
    } else if (req.url === '/step3') {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.end('<html><body><h1>Success</h1></body></html>')
    } else {
      res.writeHead(404)
      res.end()
    }
  })

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  serverPort = (server.address() as { port: number }).port

  // Intercept http.request to redirect outgoing connections to our local server
  const originalHttpRequest = http.request.bind(http)
  http.request = function (
    url: string | URL | http.RequestOptions,
    options?: http.RequestOptions | ((res: http.IncomingMessage) => void),
    callback?: (res: http.IncomingMessage) => void
  ) {
    if (url && typeof url === 'object' && 'hostname' in url && url.hostname === 'bench.local') {
      const modifiedUrl = new URL(url.toString())
      modifiedUrl.hostname = '127.0.0.1'
      modifiedUrl.port = String(serverPort)
      return originalHttpRequest(modifiedUrl, options as http.RequestOptions, callback)
    }
    return originalHttpRequest(url as URL, options as http.RequestOptions, callback)
  } as typeof http.request

  try {
    dnsLookupCount = 0
    const iterations = 500
    const startTime = performance.now()

    for (let i = 0; i < iterations; i++) {
      const result = await safeFetchHtml('http://bench.local/step1')
      assert.ok(result.html.includes('Success'))
    }

    const totalTimeMs = performance.now() - startTime
    console.log(`[Benchmark Result]`)
    console.log(`Iterations: ${iterations}`)
    console.log(`Total Time: ${totalTimeMs.toFixed(2)} ms`)
    console.log(`Avg Time per Request: ${(totalTimeMs / iterations).toFixed(3)} ms`)
    console.log(`Total DNS Lookups: ${dnsLookupCount}`)
    console.log(`DNS Lookups per Request: ${(dnsLookupCount / iterations).toFixed(2)}`)
  } finally {
    promisesDns.lookup = originalLookup
    http.request = originalHttpRequest
    server.close()
  }
}

runBenchmark().catch((err) => {
  console.error('Benchmark error:', err)
  process.exit(1)
})
