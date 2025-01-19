import { signOut, useSession } from '@hono/auth-js/react'
import { Link, NavLink } from 'react-router'
import { User } from '@auth/core/types'
import { isAdmin } from '@/lib/auth'
import { Heart, LogOut, Settings, Shield } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SearchDialog from '@/components/search-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import SigninButton from '@/components/signin-button'

type NavLinks = {
  name: string
  pathname: string
}
const navItems: NavLinks[] = [{ name: 'browse', pathname: '/browse' }]

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl flex items-center justify-between px-4 py-2">
        <div className="w-full flex justify-between">
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-lg font-bold uppercase">
              F<span className="text-pink-300">ai</span>rytales
            </Link>
            {navItems.map((navLink) => (
              <NavLink
                key={navLink.pathname}
                to={navLink.pathname}
                className={({ isActive }) =>
                  isActive
                    ? 'capitalize text-foreground'
                    : 'capitalize text-foreground/80 hover:text-foreground'
                }
              >
                {navLink.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center">
            <SearchDialog />
            {user ? <UserDropdownMenu user={user} /> : <SigninButton />}
          </div>
        </div>
      </div>
      <Separator />
    </>
  )
}

function UserDropdownMenu({ user }: { user: User }) {
  const userIsAdmin = isAdmin(user)

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
        {userIsAdmin && (
          <>
            <DropdownMenuSeparator />
            <Link to="/admin">
              <DropdownMenuItem>
                <Shield /> Admin panel
              </DropdownMenuItem>
            </Link>
          </>
        )}

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
