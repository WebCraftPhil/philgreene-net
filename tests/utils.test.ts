import assert from 'node:assert/strict'
import test from 'node:test'
import { cn } from '../lib/utils'

test('combines class names', () => {
  assert.equal(cn('foo', 'bar'), 'foo bar')
})

test('resolves conflicting Tailwind utilities', () => {
  assert.equal(cn('px-2', 'px-4'), 'px-4')
})
