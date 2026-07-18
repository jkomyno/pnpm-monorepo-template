import { sum } from '@jkomyno/common-utils'

describe('workspace package boundary', () => {
  it('resolves the dependency through its public entrypoint', () => {
    expect(sum([1, 2, 3])).toBe(6)
  })
})
