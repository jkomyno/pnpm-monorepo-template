import { sum } from '@jkomyno/common-utils'

describe('workspace imports', () => {
  it('resolves @jkomyno/common-utils to its TypeScript source, without requiring a build', () => {
    expect(sum([1, 2, 3])).toBe(6)
  })
})
