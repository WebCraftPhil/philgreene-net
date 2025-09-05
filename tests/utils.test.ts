import { describe, it, expect } from 'vitest'
import { cn } from '../lib/utils'

describe('cn', () => {
  it('combines class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
})
