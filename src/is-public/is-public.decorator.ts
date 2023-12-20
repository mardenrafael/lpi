import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';
export const IsPublic = (...args: string[]) => SetMetadata(IS_PUBLIC, args);
