import type { Nullable } from '@fullstacksjs/toolbox';

import type { User } from '../models';

export interface AuthUser {
  id: string;
  displayName: Nullable<string>;
}

export interface DbUser {
  experience?: number;
}

export interface UserDto extends AuthUser, DbUser {}

export function toUser(userDto: UserDto): User {
  return {
    id: userDto.id,
    name: userDto.displayName ?? 'Anonymous',
    experience: userDto.experience ?? 0,
  };
}
