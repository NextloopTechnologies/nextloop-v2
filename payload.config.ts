import { postgresAdapter } from '@payloadcms/db-postgres';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { assertRBACCoverage } from './src/access/collectionAccess';
import { AppliedJobs } from './src/collections/AppliedJobs';
import { Authors } from './src/collections/Authors';
import { Blogs } from './src/collections/Blogs';
import { Categories } from './src/collections/Categories';
import { Enquiries } from './src/collections/Enquiries';
import { Ideas } from './src/collections/Ideas';
import { Jobs } from './src/collections/Jobs';
import { Media } from './src/collections/Media';
import { OfferApplications } from './src/collections/OfferApplications';
import { Offers } from './src/collections/Offers';
import { PopupSubmissions } from './src/collections/PopupSubmissions';
import { Portfolio } from './src/collections/Portfolio';
import { Resumes } from './src/collections/Resumes';
import { Testimonials } from './src/collections/Testimonials';
import { Users } from './src/collections/Users';
import {
  assertEmailConfigured,
  buildEmailAdapter,
} from './src/lib/payload/email';
import { imagekitStorage } from './src/lib/payload/imagekitStorage';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Surfaced at boot rather than on the first send: somebody should see this
// before a person is locked out, not after.
assertEmailConfigured();

/**
 * Listed here rather than inline in buildConfig so the RBAC coverage check can
 * see them. That check is the backstop for the one failure mode this model has:
 * Payload's default access is "any authenticated user", so a collection added
 * to this array and forgotten in the access matrix is not inert — it is open to
 * every role, silently. Better a crash at boot than a sales account that can
 * read candidate CVs.
 */
const collections = [
  Users,
  Media,
  Resumes,
  Blogs,
  Authors,
  Categories,
  Portfolio,
  Testimonials,
  Jobs,
  AppliedJobs,
  Enquiries,
  PopupSubmissions,
  Ideas,
  Offers,
  OfferApplications,
];

assertRBACCoverage(collections);

export default buildConfig({
  // NOTE: the marketing site already owns `/api/*` via the pages router
  // (src/pages/api/**). Payload's API is namespaced to avoid shadowing it.
  routes: {
    admin: '/admin',
    api: '/payload-api',
  },

  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname, 'src') },
  },

  collections,

  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: imagekitStorage({
            urlEndpoint: process.env.IK_URL_ENDPOINT || '',
            publicKey: process.env.IK_PUBLIC_KEY || '',
            privateKey: process.env.IK_PRIVATE_KEY || '',
            folder: 'AdminNextloop',
          }),
        },
        resumes: {
          adapter: imagekitStorage({
            urlEndpoint: process.env.IK_URL_ENDPOINT || '',
            publicKey: process.env.IK_PUBLIC_KEY || '',
            privateKey: process.env.IK_PRIVATE_KEY || '',
            folder: 'AdminNextloop/Resumes',
          }),
          // Keep Payload's access control in front of resume reads rather than
          // handing out direct CDN URLs.
          disablePayloadAccessControl: undefined,
        },
      },
    }),
  ],

  // Global ceiling for every upload collection. Stops the public resume
  // endpoint being usable as free file hosting. Lowered from 8MB to 5MB as
  // part of this change — see the note in the summary, since it is a behaviour
  // change for anyone uploading a CV between those two sizes.
  upload: { limits: { fileSize: 5_000_000 } },

  // Required for the imageSizes on the media collection to actually be
  // generated. Without it Payload warns and silently produces no renditions.
  sharp,

  /**
   * The editor is configured once for every rich-text field in the project, so
   * enabling tables here enables them on `blogs.descp` and `portfolio.descp`
   * alike. That is the intended scope — a case study has the same reason to
   * carry a comparison table as an article does.
   *
   * `EXPERIMENTAL_` is Payload's own prefix and only warns that the *stored
   * node shape* may change in a future release; it is a shipped feature, not a
   * flag. The read path already handles it: `TableHTMLConverter` is part of the
   * default converter set `convertLexicalToHTML` uses, so a table authored here
   * renders as a real `<table>` in `src/lib/content/payload.ts` with no adapter
   * change. The blog template wraps the body in an `overflow-x-auto` container
   * so a wide table scrolls instead of stretching the article column.
   *
   * Spreading `defaultFeatures` rather than listing features by hand keeps
   * everything the editor has today and adds one thing.
   */
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || 'dev-only-placeholder-secret',
  typescript: { outputFile: path.resolve(dirname, 'src/payload-types.ts') },

  /**
   * Without this Payload substitutes a console logger and every send reports
   * success — which is how `forgot-password` came to return HTTP 200 while the
   * reset link went to the server log. See src/lib/payload/email.ts.
   */
  email: buildEmailAdapter(),

  db: postgresAdapter({
    // Payload owns its own tables; `schemaName` keeps them out of `public`
    // so the existing application tables stay untouched until cutover.
    schemaName: 'payload',

    /**
     * Schema push is opt-in, not the default.
     *
     * Payload pushes schema whenever NODE_ENV is not production and it is not
     * mid-migration (`db-postgres/connect.js:110`). That is convenient while
     * collections are churning against a local database — and dangerous the
     * moment `.env.local` points somewhere real, because `npm run dev` then
     * diffs the config against the cloud database and starts altering it
     * outside migrations, unrecorded. One absent-minded dev run is all it
     * takes to undo a migration.
     *
     * Now that migrations exist, they are the only thing that changes schema,
     * and the PAYLOAD_DB_PUSH escape hatch is gone with them. Roles land on a
     * database holding ~6,955 applied_jobs rows and 2,875 resumes behind a
     * schema-only backup, so a single absent-minded `npm run dev` against a
     * populated .env.local is not a risk worth keeping a flag for. Turning push
     * back on now means editing this line, deliberately, in a diff.
     */
    push: false,
    pool: {
      /**
       * Two endpoints, because migrations and serverless want opposite things.
       *
       * Supabase offers a transaction pooler and a direct connection. Vercel
       * runs each request in its own function instance, so runtime needs the
       * pooler or the direct connection limit is exhausted under any real
       * traffic. Migrations are DDL inside a transaction and want the direct
       * connection, where advisory locks and multi-statement transactions
       * behave the way the migrator expects.
       *
       * Payload sets `PAYLOAD_MIGRATING=true` before it initialises
       * (`payload/dist/bin/migrate.js:36`), so that flag can pick the endpoint
       * — but only if it is read late enough. It is NOT read late enough as a
       * plain property: `buildConfig` is evaluated when this module is
       * imported, which happens before the bin sets the flag, so a normal
       * ternary here always sees `undefined`. Verified: the migration ran
       * against the wrong database, 0 tables created in the intended one.
       *
       * A getter defers evaluation to when node-postgres actually constructs
       * the Pool, which is inside `adapter.connect()` during `payload.init` —
       * after the flag is set. Verified both directions: `payload migrate`
       * created 27 tables via DATABASE_URI_DIRECT, while the running app read
       * 5 blogs from DATABASE_URI.
       *
       * Leaving DATABASE_URI_DIRECT unset is fine and supported — everything
       * then uses DATABASE_URI, which is the right setup for local development
       * and for any host that is not serverless.
       */
      get connectionString() {
        const migrating = process.env.PAYLOAD_MIGRATING === 'true';
        const direct = process.env.DATABASE_URI_DIRECT;
        const uri = migrating && direct ? direct : process.env.DATABASE_URI;

        /**
         * Fail with the actual cause rather than letting node-postgres default.
         *
         * An empty connection string is not treated as an error by pg — it
         * falls back to localhost:5432, so a missing environment variable
         * surfaces as `connect ECONNREFUSED 127.0.0.1:5432` from inside a build
         * container that was never going to have a database. That reads as a
         * network or firewall problem and sends you looking in the wrong place;
         * it cost a Vercel deploy exactly that way.
         *
         * On Vercel, remember variables are scoped per environment: a value set
         * for Production is not visible to a Preview build.
         */
        if (!uri) {
          throw new Error(
            `${
              migrating ? 'payload migrate' : 'Payload'
            } has no database connection string: ` +
              `${
                migrating ? 'DATABASE_URI_DIRECT and ' : ''
              }DATABASE_URI are both unset. ` +
              'This is a missing environment variable, not a network failure — ' +
              'pg would otherwise default to localhost:5432. On Vercel, check the ' +
              'variable is set for the environment being built (Production and ' +
              'Preview are scoped separately).'
          );
        }
        return uri;
      },
    },
  }),
});
