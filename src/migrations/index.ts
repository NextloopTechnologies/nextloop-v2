import * as migration_20260910_105541_initial from './20260910_105541_initial';
import * as migration_20260922_113625_add_user_roles from './20260922_113625_add_user_roles';

export const migrations = [
  {
    up: migration_20260910_105541_initial.up,
    down: migration_20260910_105541_initial.down,
    name: '20260910_105541_initial',
  },
  {
    up: migration_20260922_113625_add_user_roles.up,
    down: migration_20260922_113625_add_user_roles.down,
    name: '20260922_113625_add_user_roles',
  },
];
