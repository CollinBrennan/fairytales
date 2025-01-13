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
