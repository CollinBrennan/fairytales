import { signIn, signOut, useSession } from '@hono/auth-js/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link, useLocation } from 'react-router'
import SearchDialog from './search-dialog'
import { Heart, LogOut, Settings } from 'lucide-react'
import { Separator } from './ui/separator'
import { User } from '@auth/core/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

type NavItem = {
  name: string
  pathname: string
}
const navItems: NavItem[] = [{ name: 'browse', pathname: '/browse' }]

export default function Navbar() {
  const { data: session } = useSession()
  const { pathname } = useLocation()
  const user = session?.user

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl flex items-center justify-between px-4 py-2">
        <div className="w-full flex justify-between">
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-lg font-bold uppercase">
              F<span className="text-pink-300">ai</span>rytales
            </Link>
            {navItems.map((navItem) => (
              <Link
                to={navItem.pathname}
                className={`hover:text-foreground capitalize ${
                  navItem.pathname === pathname
                    ? 'text-foreground'
                    : 'text-foreground/80'
                }`}
              >
                {navItem.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <SearchDialog />
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Button variant="outline" onClick={() => signIn('google')}>
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
      <Separator />
    </>
  )
}

function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>{user.name?.slice(2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/likes">
          <DropdownMenuItem>
            <Heart /> Likes
          </DropdownMenuItem>
        </Link>
        <Link to="/settings">
          <DropdownMenuItem>
            <Settings /> Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/', redirect: true })}
        >
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
