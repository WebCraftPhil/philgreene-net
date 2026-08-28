import fs from 'node:fs/promises'
import path from 'node:path'
import { applyRouteMeta, routeMeta } from '../server/route-meta'

const publicDir = path.resolve(process.cwd(), 'dist', 'public')
const indexPath = path.join(publicDir, 'index.html')
const indexHtml = await fs.readFile(indexPath, 'utf-8')

await Promise.all(routeMeta.map(async (meta) => {
  const routeDir = path.join(publicDir, meta.path)
  await fs.mkdir(routeDir, { recursive: true })
  await fs.writeFile(path.join(routeDir, 'index.html'), applyRouteMeta(indexHtml, meta))
}))
