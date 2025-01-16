import { Hono } from 'hono'
import { verifyAdmin } from 'server/auth'
import {
  createRouteHandler,
  createUploadthing,
  type FileRouter,
} from 'uploadthing/server'

const f = createUploadthing()

const uploadRouter = {
  titleCover: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  }).onUploadComplete((data) => {
    console.log('upload completed on server', data)
  }),
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter

const handlers = createRouteHandler({ router: uploadRouter })

export const uploadthingRoute = new Hono().all('/', verifyAdmin(), (c) =>
  handlers(c.req.raw)
)
