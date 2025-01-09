import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SessionProvider } from '@hono/auth-js/react'

createRoot(document.getElementById('root')!).render(
  <SessionProvider>
    <App />
  </SessionProvider>
)
