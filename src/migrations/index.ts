import * as migration_20260910_105541_initial from './20260910_105541_initial';
import * as migration_20260922_113625_add_user_roles from './20260922_113625_add_user_roles';
import * as migration_20261112_114534_add_blog_published_at from './20261112_114534_add_blog_published_at';

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
  {
    up: migration_20261112_114534_add_blog_published_at.up,
    down: migration_20261112_114534_add_blog_published_at.down,
    name: '20261112_114534_add_blog_published_at',
  },
];
