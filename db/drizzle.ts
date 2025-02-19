import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

import * as save from './schema/save'
import * as tag from './schema/tag'
import * as title from './schema/title'
import * as type from './schema/type'
import * as titleTag from './schema/title-tag'
import * as users from './schema/users'

const schema = { ...save, ...tag, ...title, ...type, ...titleTag, ...users }

const sqlite = new Database(process.env.DB_FILE_NAME!)
const db = drizzle({ client: sqlite, schema })

export default db
