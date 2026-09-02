import path from 'path';
import { fileURLToPath } from 'url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

import { Media } from './src/collections/Media';
import { Resumes } from './src/collections/Resumes';
import { imagekitStorage } from './src/lib/payload/imagekitStorage';

const dirname = path.dirname(fileURLToPath(import.meta.url));

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

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-only-placeholder-secret',
  typescript: { outputFile: path.resolve(dirname, 'src/payload-types.ts') },

  db: postgresAdapter({
    // Payload owns its own tables; `schemaName` keeps them out of `public`
    // so the existing application tables stay untouched until cutover.
    schemaName: 'payload',
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
});
