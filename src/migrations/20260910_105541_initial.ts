import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  /**
   * Hand-added, and required.
   *
   * `payload.config.ts` sets `schemaName: 'payload'` so Payload's tables stay
   * out of `public` alongside the application's own. Every statement below is
   * qualified with that schema — but `migrate:create` does not emit a
   * `CREATE SCHEMA` for it, because it generates a diff against a database
   * where the schema already exists (dev, where `push` created it).
   *
   * On a genuinely empty database — a new production instance, which is the
   * only place migrations ever run — the first statement therefore fails with
   * `schema "payload" does not exist`, the transaction rolls back, and nothing
   * is created at all. Verified: 0 tables, `public` the only schema.
   *
   * IF NOT EXISTS so this stays safe to re-run and safe against a database
   * where dev-mode push already made the schema.
   */
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS "payload";`);

  await db.execute(sql`
   CREATE TYPE "payload"."enum_blogs_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum_jobs_job_mode" AS ENUM('Remote', 'On-site', 'Hybrid');
  CREATE TYPE "payload"."enum_jobs_job_type" AS ENUM('Full Time', 'Part Time', 'Contract');
  CREATE TABLE "payload"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"imagekit_file_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_imagekit_file_id" varchar,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_imagekit_file_id" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_imagekit_file_id" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_imagekit_file_id" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "payload"."resumes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"candidate_name" varchar,
  	"legacy_resume_url" varchar,
  	"imagekit_file_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload"."blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "payload"."enum_blogs_status" DEFAULT 'draft' NOT NULL,
  	"cover_image_id" integer,
  	"descp" jsonb,
  	"author_id" integer,
  	"category_id" integer,
  	"read_time" numeric DEFAULT 2 NOT NULL,
  	"service" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."blogs_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."blogs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blogs_id" integer
  );
  
  CREATE TABLE "payload"."authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"designation" varchar,
  	"description" varchar,
  	"profile" varchar,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."portfolio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"descp" jsonb,
  	"active" boolean DEFAULT true,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."portfolio_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "payload"."testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"feedback_by" varchar,
  	"feedback_descp" varchar,
  	"comp_and_desig" varchar,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"descp" varchar,
  	"location" varchar,
  	"job_mode" "payload"."enum_jobs_job_mode",
  	"job_type" "payload"."enum_jobs_job_type",
  	"package" varchar,
  	"visibility" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."jobs_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."applied_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fullname" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"job_id" integer,
  	"resume_id" integer,
  	"experience" varchar DEFAULT '0-1',
  	"linkedin_url" varchar,
  	"github_url" varchar,
  	"cover_letter" varchar,
  	"legacy_resume_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"fullname" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"contact" varchar,
  	"subject" varchar NOT NULL,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."popup_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"service" varchar NOT NULL,
  	"phone" varchar,
  	"country" varchar,
  	"legacy_uuid" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."ideas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mail" varchar NOT NULL,
  	"idea_descp" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."offers_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."offer_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"mobile" varchar NOT NULL,
  	"company_name" varchar,
  	"offer_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"resumes_id" integer,
  	"blogs_id" integer,
  	"authors_id" integer,
  	"categories_id" integer,
  	"portfolio_id" integer,
  	"testimonials_id" integer,
  	"jobs_id" integer,
  	"applied_jobs_id" integer,
  	"enquiries_id" integer,
  	"popup_submissions_id" integer,
  	"ideas_id" integer,
  	"offers_id" integer,
  	"offer_applications_id" integer
  );
  
  CREATE TABLE "payload"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blogs" ADD CONSTRAINT "blogs_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blogs" ADD CONSTRAINT "blogs_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "payload"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blogs" ADD CONSTRAINT "blogs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blogs" ADD CONSTRAINT "blogs_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."blogs_texts" ADD CONSTRAINT "blogs_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blogs_rels" ADD CONSTRAINT "blogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."blogs_rels" ADD CONSTRAINT "blogs_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "payload"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."authors" ADD CONSTRAINT "authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."portfolio" ADD CONSTRAINT "portfolio_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."portfolio_rels" ADD CONSTRAINT "portfolio_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."portfolio_rels" ADD CONSTRAINT "portfolio_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."jobs" ADD CONSTRAINT "jobs_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."jobs_texts" ADD CONSTRAINT "jobs_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."applied_jobs" ADD CONSTRAINT "applied_jobs_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "payload"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."applied_jobs" ADD CONSTRAINT "applied_jobs_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "payload"."resumes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."offers_texts" ADD CONSTRAINT "offers_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."offer_applications" ADD CONSTRAINT "offer_applications_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "payload"."offers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resumes_fk" FOREIGN KEY ("resumes_id") REFERENCES "payload"."resumes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "payload"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "payload"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "payload"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "payload"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "payload"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applied_jobs_fk" FOREIGN KEY ("applied_jobs_id") REFERENCES "payload"."applied_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "payload"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_popup_submissions_fk" FOREIGN KEY ("popup_submissions_id") REFERENCES "payload"."popup_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ideas_fk" FOREIGN KEY ("ideas_id") REFERENCES "payload"."ideas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "payload"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offer_applications_fk" FOREIGN KEY ("offer_applications_id") REFERENCES "payload"."offer_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "payload"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "payload"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "payload"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "payload"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "payload"."media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "payload"."media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "payload"."media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "payload"."media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "payload"."media" USING btree ("sizes_og_filename");
  CREATE INDEX "resumes_updated_at_idx" ON "payload"."resumes" USING btree ("updated_at");
  CREATE INDEX "resumes_created_at_idx" ON "payload"."resumes" USING btree ("created_at");
  CREATE UNIQUE INDEX "resumes_filename_idx" ON "payload"."resumes" USING btree ("filename");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "payload"."blogs" USING btree ("slug");
  CREATE INDEX "blogs_cover_image_idx" ON "payload"."blogs" USING btree ("cover_image_id");
  CREATE INDEX "blogs_author_idx" ON "payload"."blogs" USING btree ("author_id");
  CREATE INDEX "blogs_category_idx" ON "payload"."blogs" USING btree ("category_id");
  CREATE INDEX "blogs_og_image_idx" ON "payload"."blogs" USING btree ("og_image_id");
  CREATE INDEX "blogs_updated_at_idx" ON "payload"."blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "payload"."blogs" USING btree ("created_at");
  CREATE INDEX "blogs_texts_order_parent" ON "payload"."blogs_texts" USING btree ("order","parent_id");
  CREATE INDEX "blogs_rels_order_idx" ON "payload"."blogs_rels" USING btree ("order");
  CREATE INDEX "blogs_rels_parent_idx" ON "payload"."blogs_rels" USING btree ("parent_id");
  CREATE INDEX "blogs_rels_path_idx" ON "payload"."blogs_rels" USING btree ("path");
  CREATE INDEX "blogs_rels_blogs_id_idx" ON "payload"."blogs_rels" USING btree ("blogs_id");
  CREATE INDEX "authors_avatar_idx" ON "payload"."authors" USING btree ("avatar_id");
  CREATE INDEX "authors_updated_at_idx" ON "payload"."authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "payload"."authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "payload"."categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "payload"."categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "payload"."categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "portfolio_slug_idx" ON "payload"."portfolio" USING btree ("slug");
  CREATE INDEX "portfolio_og_image_idx" ON "payload"."portfolio" USING btree ("og_image_id");
  CREATE INDEX "portfolio_updated_at_idx" ON "payload"."portfolio" USING btree ("updated_at");
  CREATE INDEX "portfolio_created_at_idx" ON "payload"."portfolio" USING btree ("created_at");
  CREATE INDEX "portfolio_rels_order_idx" ON "payload"."portfolio_rels" USING btree ("order");
  CREATE INDEX "portfolio_rels_parent_idx" ON "payload"."portfolio_rels" USING btree ("parent_id");
  CREATE INDEX "portfolio_rels_path_idx" ON "payload"."portfolio_rels" USING btree ("path");
  CREATE INDEX "portfolio_rels_media_id_idx" ON "payload"."portfolio_rels" USING btree ("media_id");
  CREATE INDEX "testimonials_avatar_idx" ON "payload"."testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "payload"."testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "payload"."testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "payload"."jobs" USING btree ("slug");
  CREATE INDEX "jobs_og_image_idx" ON "payload"."jobs" USING btree ("og_image_id");
  CREATE INDEX "jobs_updated_at_idx" ON "payload"."jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "payload"."jobs" USING btree ("created_at");
  CREATE INDEX "jobs_texts_order_parent" ON "payload"."jobs_texts" USING btree ("order","parent_id");
  CREATE INDEX "applied_jobs_job_idx" ON "payload"."applied_jobs" USING btree ("job_id");
  CREATE INDEX "applied_jobs_resume_idx" ON "payload"."applied_jobs" USING btree ("resume_id");
  CREATE INDEX "applied_jobs_updated_at_idx" ON "payload"."applied_jobs" USING btree ("updated_at");
  CREATE INDEX "applied_jobs_created_at_idx" ON "payload"."applied_jobs" USING btree ("created_at");
  CREATE INDEX "enquiries_updated_at_idx" ON "payload"."enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "payload"."enquiries" USING btree ("created_at");
  CREATE INDEX "popup_submissions_updated_at_idx" ON "payload"."popup_submissions" USING btree ("updated_at");
  CREATE INDEX "popup_submissions_created_at_idx" ON "payload"."popup_submissions" USING btree ("created_at");
  CREATE INDEX "ideas_updated_at_idx" ON "payload"."ideas" USING btree ("updated_at");
  CREATE INDEX "ideas_created_at_idx" ON "payload"."ideas" USING btree ("created_at");
  CREATE INDEX "offers_updated_at_idx" ON "payload"."offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "payload"."offers" USING btree ("created_at");
  CREATE INDEX "offers_texts_order_parent" ON "payload"."offers_texts" USING btree ("order","parent_id");
  CREATE INDEX "offer_applications_offer_idx" ON "payload"."offer_applications" USING btree ("offer_id");
  CREATE INDEX "offer_applications_updated_at_idx" ON "payload"."offer_applications" USING btree ("updated_at");
  CREATE INDEX "offer_applications_created_at_idx" ON "payload"."offer_applications" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_resumes_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("resumes_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_portfolio_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("portfolio_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_applied_jobs_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("applied_jobs_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_popup_submissions_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("popup_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_ideas_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("ideas_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_offer_applications_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("offer_applications_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload"."payload_migrations" USING btree ("created_at");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."users_sessions" CASCADE;
  DROP TABLE "payload"."users" CASCADE;
  DROP TABLE "payload"."media" CASCADE;
  DROP TABLE "payload"."resumes" CASCADE;
  DROP TABLE "payload"."blogs" CASCADE;
  DROP TABLE "payload"."blogs_texts" CASCADE;
  DROP TABLE "payload"."blogs_rels" CASCADE;
  DROP TABLE "payload"."authors" CASCADE;
  DROP TABLE "payload"."categories" CASCADE;
  DROP TABLE "payload"."portfolio" CASCADE;
  DROP TABLE "payload"."portfolio_rels" CASCADE;
  DROP TABLE "payload"."testimonials" CASCADE;
  DROP TABLE "payload"."jobs" CASCADE;
  DROP TABLE "payload"."jobs_texts" CASCADE;
  DROP TABLE "payload"."applied_jobs" CASCADE;
  DROP TABLE "payload"."enquiries" CASCADE;
  DROP TABLE "payload"."popup_submissions" CASCADE;
  DROP TABLE "payload"."ideas" CASCADE;
  DROP TABLE "payload"."offers" CASCADE;
  DROP TABLE "payload"."offers_texts" CASCADE;
  DROP TABLE "payload"."offer_applications" CASCADE;
  DROP TABLE "payload"."payload_kv" CASCADE;
  DROP TABLE "payload"."payload_locked_documents" CASCADE;
  DROP TABLE "payload"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload"."payload_preferences" CASCADE;
  DROP TABLE "payload"."payload_preferences_rels" CASCADE;
  DROP TABLE "payload"."payload_migrations" CASCADE;
  DROP TYPE "payload"."enum_blogs_status";
  DROP TYPE "payload"."enum_jobs_job_mode";
  DROP TYPE "payload"."enum_jobs_job_type";`)
}
