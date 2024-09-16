import { sum } from '../../src'

describe('sum', () => {
  it('sum([]) = 0', () => {
    expect(sum([])).toBe(0)
    expect(sum([])).toMatchSnapshot()
  })

  it('sum([2, 3, 0, 1]) = 6', () => {
    expect(sum([2, 3, 0, 1])).toEqual(6)
    expect(sum([])).toMatchSnapshot()
  })
})
