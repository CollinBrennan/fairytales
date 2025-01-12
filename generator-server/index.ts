import app from './app'

Bun.serve({
  fetch: app.fetch,
  port: '3001',
})

console.log('Generator server running')
