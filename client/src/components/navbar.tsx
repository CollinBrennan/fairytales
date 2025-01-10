import { signIn, signOut, useSession } from '@hono/auth-js/react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router'
import SearchDialog from './search-dialog'
import { Heart } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-screen-xl flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link to="/" className="font-bold">
            Fairytales
          </Link>
          <Link to="/browse" className={buttonVariants({ variant: 'link' })}>
            Browse
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <SearchDialog />
          {user ? (
            <>
              <Link to="/likes">
                <Heart />
              </Link>
              <Popover>
                <PopoverTrigger asChild tabIndex={0}>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback>{user.name?.slice(2)}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col w-full">
                  <Button
                    variant="link"
                    onClick={() =>
                      signOut({ callbackUrl: '/', redirect: true })
                    }
                  >
                    Sign out
                  </Button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button variant="outline" onClick={() => signIn('google')}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
