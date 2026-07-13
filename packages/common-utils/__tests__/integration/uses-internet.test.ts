describe('should be able to connect to the internet', () => {
  it('/todos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const todos = await response.json()
    assert(Array.isArray(todos))
    expect(todos.length).toBeGreaterThan(0)
  })

  it('/users', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    assert(Array.isArray(users))
    expect(users.length).toBeGreaterThan(0)
  })
})
