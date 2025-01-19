import { User } from '@auth/core/types'

export function isAdmin(user: User) {
  return user.role === 'admin'
}

// Typescript wont accept the root type file so I guess I'm redeclaring these modules
// ＼（〇_ｏ）／

declare module '@auth/core/types' {
  export interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
  }

  export interface Session {
    user?: User
    expires: string
  }
}
