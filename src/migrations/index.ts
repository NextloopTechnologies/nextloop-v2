import * as migration_20260910_105541_initial from './20260910_105541_initial';

export const migrations = [
  {
    up: migration_20260910_105541_initial.up,
    down: migration_20260910_105541_initial.down,
    name: '20260910_105541_initial'
  },
];
