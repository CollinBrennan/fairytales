import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono({ strict: false }).basePath('/')

async function generateTitle() {
  const { stdout, stderr } = Bun.spawnSync(['python', './scripts/test.py'])
  console.log('Python: ', stdout.toString())
  console.log('Python error: ', stderr.toString())
  const file = Bun.file('./output/data.json')
  const data = await file.json()
  return data
}

// middleware
app.use('*', logger())

// routes
app.get('/api/title', async (c) => c.json(await generateTitle()))

app.get('/api/*', (c) => c.notFound())

export default app
