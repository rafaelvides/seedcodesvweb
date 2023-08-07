import { SetMetadata } from '@nestjs/common'
import { ValidRoles } from '../interfaces'

export const META_ROLE = 'roles'

export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLE, args)
}
