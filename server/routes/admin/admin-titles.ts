import { Hono } from 'hono'

export const adminTitleRoute = new Hono().get('/', (c) => c.text('Hello!!'))
