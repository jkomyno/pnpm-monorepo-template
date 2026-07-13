# Vitest Basics

Open this reference when writing regular Vitest tests, setup and teardown, spies, globals, async assertions, or module-isolation fixtures.

Keep setup local to a test file unless several files genuinely share the same fixture.

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('normalizeName', () => {
  it('trims and lowercases input', () => {
    expect(' Ada '.trim().toLowerCase()).toBe('ada')
  })
})
```

Prefer dependency injection or `vi.spyOn` over broad module mocks when a boundary can be replaced narrowly.

```ts
import { expect, it, vi } from 'vitest'

it('loads a user through the client boundary', async () => {
  const client = {
    fetchUser: (_id: string): Promise<{ readonly name: string }> => Promise.resolve({ name: 'Ada' }),
  }
  const fetchUser = vi.spyOn(client, 'fetchUser').mockResolvedValue({ name: 'Lin' })

  await expect(client.fetchUser('user-1')).resolves.toEqual({ name: 'Lin' })
  expect(fetchUser).toHaveBeenCalledWith('user-1')
})
```

- Use `expect(...).resolves` and `expect(...).rejects` so asynchronous assertions are awaited.
- Use `vi.stubGlobal` for browser or runtime globals and restore them after the test.
- Use `vi.resetModules()` and re-import inside a test only when module state must be isolated.
- Prefer explicit fixtures over shared mutable objects.
- Use `test.each` or `it.each` when several examples verify one rule; keep separate tests when scenarios have different failure meanings.
