import path from 'path';
import { fileURLToPath } from 'url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

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
import { imagekitStorage } from './src/lib/payload/imagekitStorage';
import { assertEmailConfigured, buildEmailAdapter } from './src/lib/payload/email';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Surfaced at boot rather than on the first send: somebody should see this
// before a person is locked out, not after.
assertEmailConfigured();

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

  collections: [
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [{ name: 'name', type: 'text' }],
    },
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
  ],

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
  // endpoint being usable as free file hosting.
  upload: { limits: { fileSize: 8 * 1024 * 1024 } },

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
    features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()],
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
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
});
