import { sum } from 'src'

describe('sum', () => {
  it.each([
    { input: [], expected: 0 },
    { input: [2, 3, 0, 1], expected: 6 },
    { input: [2, -3, 1], expected: 0 },
  ])('returns $expected for $input', ({ input, expected }) => {
    expect(sum(input)).toBe(expected)
  })
})
