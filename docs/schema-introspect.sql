-- Nextloop: authoritative schema snapshot for the Payload migration.
-- Run in Supabase Studio → SQL Editor against the PRODUCTION project.
-- Returns one JSON document. Use "Download JSON" (or copy the single cell).
-- Read-only: selects from catalog views only, touches no application data.

with cols as (
  select
    c.table_name,
    c.ordinal_position,
    c.column_name,
    c.data_type,
    c.udt_name,
    c.is_nullable = 'YES'            as nullable,
    c.column_default,
    c.character_maximum_length      as max_len
  from information_schema.columns c
  join information_schema.tables t
    on t.table_schema = c.table_schema
   and t.table_name  = c.table_name
   and t.table_type  = 'BASE TABLE'
  where c.table_schema = 'public'
),
pks as (
  select tc.table_name, kcu.column_name
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on kcu.constraint_name = tc.constraint_name
   and kcu.table_schema    = tc.table_schema
  where tc.table_schema = 'public' and tc.constraint_type = 'PRIMARY KEY'
),
uniques as (
  select tc.table_name, kcu.column_name
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on kcu.constraint_name = tc.constraint_name
   and kcu.table_schema    = tc.table_schema
  where tc.table_schema = 'public' and tc.constraint_type = 'UNIQUE'
),
fks as (
  select
    tc.table_name,
    kcu.column_name,
    ccu.table_name  as ref_table,
    ccu.column_name as ref_column,
    rc.delete_rule
  from information_schema.table_constraints tc
  join information_schema.key_column_usage kcu
    on kcu.constraint_name = tc.constraint_name
   and kcu.table_schema    = tc.table_schema
  join information_schema.constraint_column_usage ccu
    on ccu.constraint_name = tc.constraint_name
  join information_schema.referential_constraints rc
    on rc.constraint_name  = tc.constraint_name
  where tc.table_schema = 'public' and tc.constraint_type = 'FOREIGN KEY'
),
enums as (
  select t.typname as enum_name,
         jsonb_agg(e.enumlabel order by e.enumsortorder) as values
  from pg_type t
  join pg_enum e on e.enumtypid = t.oid
  join pg_namespace n on n.oid = t.typnamespace
  where n.nspname = 'public'
  group by t.typname
),
counts as (
  select relname as table_name, n_live_tup as approx_rows
  from pg_stat_user_tables
),
rls as (
  select c.relname as table_name, c.relrowsecurity as rls_enabled
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind = 'r'
),
policies as (
  select tablename as table_name,
         jsonb_agg(jsonb_build_object(
           'policy', policyname, 'command', cmd, 'roles', roles,
           'using', qual, 'with_check', with_check
         ) order by policyname) as policies
  from pg_policies
  where schemaname = 'public'
  group by tablename
)
select jsonb_pretty(jsonb_build_object(
  'generated_at', now(),
  'enums', coalesce((select jsonb_object_agg(enum_name, values) from enums), '{}'::jsonb),
  'tables', (
    select jsonb_object_agg(tn, tbl)
    from (
      select
        cols.table_name as tn,
        jsonb_build_object(
          'approx_rows', (select approx_rows from counts where counts.table_name = cols.table_name),
          'rls_enabled', (select rls_enabled from rls where rls.table_name = cols.table_name),
          'policies',    coalesce((select policies from policies where policies.table_name = cols.table_name), '[]'::jsonb),
          'columns', jsonb_agg(
            jsonb_build_object(
              'name',      cols.column_name,
              'type',      cols.data_type,
              'udt',       cols.udt_name,
              'nullable',  cols.nullable,
              'default',   cols.column_default,
              'max_len',   cols.max_len,
              'pk',        exists (select 1 from pks     where pks.table_name = cols.table_name     and pks.column_name = cols.column_name),
              'unique',    exists (select 1 from uniques where uniques.table_name = cols.table_name and uniques.column_name = cols.column_name),
              'fk',        (select jsonb_build_object('table', ref_table, 'column', ref_column, 'on_delete', delete_rule)
                            from fks where fks.table_name = cols.table_name and fks.column_name = cols.column_name limit 1)
            ) order by cols.ordinal_position
          )
        ) as tbl
      from cols
      group by cols.table_name
    ) s
  )
)) as schema_snapshot;
