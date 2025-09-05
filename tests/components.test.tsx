import { describe, it, expect } from 'vitest'

describe('Basic Tests', () => {
  it('should pass basic math', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle strings', () => {
    expect('hello world').toContain('world')
  })

  it('should work with arrays', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
    expect(arr).toContain(2)
  })
})
