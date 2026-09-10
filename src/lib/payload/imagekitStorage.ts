import type {
  Adapter,
  GeneratedAdapter,
} from '@payloadcms/plugin-cloud-storage/types';
import ImageKit from 'imagekit';

/**
 * ImageKit storage adapter for @payloadcms/plugin-cloud-storage.
 *
 * ImageKit is not an official Payload adapter, so this implements the four
 * required hooks against the ImageKit Node SDK.
 *
 * Two ImageKit behaviours drive the design:
 *
 *  1. ImageKit assigns its own `fileId` on upload and every mutation (delete,
 *     rename) is keyed on that id, NOT on the filename. So the id has to be
 *     persisted on the Payload document — that is the `imagekitFileId` field
 *     injected below. It doubles as the migration key: the existing
 *     `blogs.image` / `portfolio.image` jsonb blobs already store `{fileId, url}`,
 *     so historical rows map straight onto it.
 *
 *  2. ImageKit may rename on collision (`useUniqueFileName`). We disable that so
 *     Payload's filename stays authoritative and `generateURL` remains a pure
 *     function of prefix + filename.
 */

type Args = {
  /** ImageKit URL endpoint, e.g. https://ik.imagekit.io/nextloop */
  urlEndpoint: string;
  publicKey: string;
  /** SERVER-ONLY. Must never be exposed via a NEXT_PUBLIC_ variable. */
  privateKey: string;
  /** Root folder in the ImageKit media library. */
  folder: string;
};

const joinPath = (...parts: (string | undefined)[]) =>
  parts
    .filter(Boolean)
    .map((p) => String(p).replace(/^\/+|\/+$/g, ''))
    .filter((p) => p.length > 0)
    .join('/');

export const imagekitStorage =
  ({ urlEndpoint, publicKey, privateKey, folder }: Args): Adapter =>
  ({ prefix }): GeneratedAdapter => {
    // Constructed lazily, not at module/adapter scope. `next build` evaluates
    // the Payload config while collecting route data, at which point the
    // ImageKit env vars are absent and the SDK constructor throws
    // ("Missing publicKey during ImageKit initialization"), failing the build.
    // Deferring it means credentials are only required when a file is actually
    // moved — which is also what makes the build work in CI without secrets.
    let client: ImageKit | undefined;
    const getClient = () => {
      if (!client) {
        if (!urlEndpoint || !publicKey || !privateKey) {
          throw new Error(
            'ImageKit storage is not configured. Set IK_URL_ENDPOINT, IK_PUBLIC_KEY and IK_PRIVATE_KEY (server-only — never NEXT_PUBLIC_).'
          );
        }
        client = new ImageKit({ urlEndpoint, publicKey, privateKey });
      }
      return client;
    };

    return {
      name: 'imagekit',

      // Persisted alongside every upload so deletes can address the file, and
      // so pre-existing ImageKit assets can be back-filled during migration.
      fields: [
        {
          name: 'imagekitFileId',
          type: 'text',
          admin: { readOnly: true, hidden: true },
        },
      ],

      handleUpload: async ({ data, file }) => {
        const result = await getClient().upload({
          file: file.buffer,
          fileName: file.filename,
          folder: joinPath(folder, prefix),
          useUniqueFileName: false,
        });

        // Mutating `data` is how this plugin persists adapter-owned fields.
        // eslint-disable-next-line no-param-reassign
        data.imagekitFileId = result.fileId;

        return data;
      },

      handleDelete: async ({ doc }) => {
        const fileId = (doc as { imagekitFileId?: string }).imagekitFileId;

        // Nothing to delete for rows created before this adapter existed and
        // never re-uploaded. Deleting by filename is not supported by ImageKit,
        // so we no-op rather than throw and block the document delete.
        if (!fileId) return;

        try {
          await getClient().deleteFile(fileId);
        } catch (error) {
          const status = (error as { $ResponseMetadata?: { statusCode?: number } })
            ?.$ResponseMetadata?.statusCode;
          // 404 means the asset is already gone — treat as success so Payload
          // is never blocked from deleting the document.
          if (status !== 404) throw error;
        }
      },

      generateURL: ({ filename, prefix: docPrefix }) =>
        `${urlEndpoint.replace(/\/+$/, '')}/${joinPath(folder, docPrefix ?? prefix, filename)}`,

      // Payload proxies file reads through its own route so that collection
      // access control is enforced — this is what keeps the `resumes`
      // collection genuinely private rather than public-by-URL.
      staticHandler: async (req, { params }) => {
        const url = `${urlEndpoint.replace(/\/+$/, '')}/${joinPath(
          folder,
          params.prefix ?? prefix,
          params.filename
        )}`;

        const upstream = await fetch(url);
        if (!upstream.ok || !upstream.body) {
          return new Response(null, { status: upstream.status || 404 });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            'Content-Type':
              upstream.headers.get('content-type') ?? 'application/octet-stream',
            'Content-Length': upstream.headers.get('content-length') ?? '',
            'Cache-Control': req.user
              ? 'private, no-store'
              : 'public, max-age=31536000, immutable',
          },
        });
      },
    };
  };
