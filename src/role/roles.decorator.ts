import { SetMetadata } from '@nestjs/common';

export const Roles = (...Role: string[]) => SetMetadata('roles', Role);
