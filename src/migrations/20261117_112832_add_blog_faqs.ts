import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

/**
 * Adds the table behind the Blogs collection's `faqs` array field.
 *
 * Generated with `npm run migrate:create`, then edited twice:
 *
 *  1. The generator emits `{ db, payload, req }`. `noUnusedParameters` turns
 *     the two it does not use into build-breaking type errors, so the
 *     signature is trimmed — the same edit the earlier migrations needed.
 *  2. Statement terminators and quoting left as generated; only whitespace
 *     was touched.
 *
 * Safety: `up` creates one new table and touches nothing that exists. No
 * column is added to `blogs`, no row is read or written, and no lock is taken
 * on live data, so this is safe to run against the production database while
 * the site is serving.
 *
 * `down` drops the table, which destroys any FAQs editors have written. That
 * is the correct inverse of a create, but it is the only destructive statement
 * in the migration set — do not run it to "reset" anything.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload"."blogs_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );

  ALTER TABLE "payload"."blogs_faqs" ADD CONSTRAINT "blogs_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blogs_faqs_order_idx" ON "payload"."blogs_faqs" USING btree ("_order");
  CREATE INDEX "blogs_faqs_parent_id_idx" ON "payload"."blogs_faqs" USING btree ("_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."blogs_faqs" CASCADE;`);
}
