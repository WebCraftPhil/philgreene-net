import assert from 'node:assert/strict'
import test from 'node:test'
import { getMailtrapConfig } from '../server/email'

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
    return
  }

  process.env[name] = value
}

test('reads Mailtrap sender config from project env variables', () => {
  const originalApiKey = process.env.MAILTRAP_API_KEY
  const originalApiToken = process.env.MAILTRAP_API_TOKEN
  const originalFromEmail = process.env.MAILTRAP_FROM_EMAIL
  const originalDefaultFromEmail = process.env.DEFAULT_FROM_EMAIL
  const originalFromName = process.env.MAILTRAP_FROM_NAME

  delete process.env.MAILTRAP_API_KEY
  process.env.MAILTRAP_API_TOKEN = 'test-api-token'
  process.env.MAILTRAP_FROM_EMAIL = 'me@philgreene.net'
  process.env.DEFAULT_FROM_EMAIL = 'fallback@philgreene.net'
  process.env.MAILTRAP_FROM_NAME = 'Phil Greene'

  assert.deepEqual(getMailtrapConfig(), {
    apiKey: 'test-api-token',
    fromEmail: 'me@philgreene.net',
    fromName: 'Phil Greene',
  })

  restoreEnv('MAILTRAP_API_KEY', originalApiKey)
  restoreEnv('MAILTRAP_API_TOKEN', originalApiToken)
  restoreEnv('MAILTRAP_FROM_EMAIL', originalFromEmail)
  restoreEnv('DEFAULT_FROM_EMAIL', originalDefaultFromEmail)
  restoreEnv('MAILTRAP_FROM_NAME', originalFromName)
})

test('falls back to DEFAULT_FROM_EMAIL for Mailtrap sender email', () => {
  const originalFromEmail = process.env.MAILTRAP_FROM_EMAIL
  const originalDefaultFromEmail = process.env.DEFAULT_FROM_EMAIL
  const originalFromName = process.env.MAILTRAP_FROM_NAME

  delete process.env.MAILTRAP_FROM_EMAIL
  delete process.env.MAILTRAP_FROM_NAME
  process.env.DEFAULT_FROM_EMAIL = 'default@philgreene.net'

  assert.equal(getMailtrapConfig().fromEmail, 'default@philgreene.net')
  assert.equal(getMailtrapConfig().fromName, 'Phil Greene')

  restoreEnv('MAILTRAP_FROM_EMAIL', originalFromEmail)
  restoreEnv('DEFAULT_FROM_EMAIL', originalDefaultFromEmail)
  restoreEnv('MAILTRAP_FROM_NAME', originalFromName)
})
