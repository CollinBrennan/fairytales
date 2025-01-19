import { User } from '@auth/core/types'

export function isAdmin(user: User) {
  return user.role === 'admin'
}
