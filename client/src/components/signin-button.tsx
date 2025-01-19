import { signIn } from '@hono/auth-js/react'
import { Button } from '@/components/ui/button'

export default function SigninButton() {
  return (
    <Button variant="outline" onClick={() => signIn('google')}>
      Sign in
    </Button>
  )
}
