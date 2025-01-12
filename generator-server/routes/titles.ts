import { Hono } from 'hono'

const OUTPUT_DIR = './generator-server/output/data.json'
const SCRIPT_DIR = './generator-server/scripts/test.py'

async function generateTitle() {
  const file = Bun.file(OUTPUT_DIR)
  const proc = Bun.spawnSync(['python', SCRIPT_DIR], { stdout: file })

  const error = proc.stderr.toString()
  if (error) console.log('Python error: ' + error)

  const data = await file.json()
  return data
}

export const titleRoute = new Hono().get('/', async (c) => {
  return c.json({ titles: await generateTitle() })
})
