import {
  APIError,
  type CollectionBeforeChangeHook,
  type CollectionBeforeDeleteHook,
  type CollectionBeforeValidateHook,
  type CollectionConfig,
} from 'payload';

import {
  adminOnly,
  adminOnlyField,
  hasAnyRole,
  isAdmin,
  ROLE_OPTIONS,
} from '../access/roles';

/**
 * Staff accounts.
 *
 * Previously declared inline in payload.config.ts as four lines — a slug, an
 * email and a name. It is moved here because it now carries the rules that
 * decide what everybody else can do, and those want to sit next to the other
 * collections rather than buried in the config.
 *
 * This is the one collection `roleAccess()` does not generate, because its
 * rules are not "which roles may write": they are "an admin, or yourself".
 *
 * Three things have to hold at once, and each is enforced separately below:
 *
 *  1. **Nobody grants themselves a role.** Field-level access on `role`.
 *  2. **Somebody always holds admin.** Hooks on change and delete.
 *  3. **The first account is an admin.** Hook on create — the create-first-user
 *     screen runs with no session, so there is nobody to set a role.
 */

/** How many admins exist right now. Joins the caller's transaction via `req`. */
const countAdmins = async (
  req: Parameters<CollectionBeforeChangeHook>[0]['req']
): Promise<number> => {
  const { totalDocs } = await req.payload.count({
    collection: 'users',
    where: { role: { equals: 'admin' } },
    req,
  });
  return totalDocs;
};

/**
 * The first user ever created becomes an admin.
 *
 * `/admin/create-first-user` posts with no authenticated session, so there is
 * no admin present to choose a role — and `role` is `required`, so without this
 * the very first submission fails validation and the panel is unreachable by
 * anyone. Bootstrapping is the whole job.
 *
 * Scoped by a count rather than by "is this the create-first-user route", so it
 * cannot be re-triggered later: once one user exists, this does nothing, and a
 * role has to be chosen explicitly by an admin.
 */
const assignFirstUserAdmin: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') return data;

  const { totalDocs } = await req.payload.count({ collection: 'users', req });
  if (totalDocs > 0) return data;

  return { ...data, role: 'admin' };
};

/**
 * Refuses to demote the last admin.
 *
 * Without this, one careless edit on the wrong document leaves an installation
 * with no account that can create users, assign roles or reach the leads —
 * unrecoverable through the panel, and fixable only with direct database
 * access. The failure is quiet at the moment it happens and total afterwards.
 *
 * Only fires when a document that *is* admin is being changed to something
 * else, so ordinary edits (name, password, email) never pay for the count.
 */
const preventLastAdminDemotion: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (operation !== 'update') return data;
  if (originalDoc?.role !== 'admin') return data;
  // `undefined` means the field was not part of this update at all.
  if (data.role === undefined || data.role === 'admin') return data;

  if ((await countAdmins(req)) <= 1) {
    throw new APIError(
      'This is the only admin account. Give another user the Admin role before changing this one, ' +
        'or the panel will be left with nobody who can manage users.',
      400
    );
  }

  return data;
};

/**
 * The same guarantee against the other way of losing the last admin.
 *
 * Deleting is not an update, so `preventLastAdminDemotion` never sees it.
 */
const preventLastAdminDeletion: CollectionBeforeDeleteHook = async ({
  id,
  req,
}) => {
  const doc = await req.payload.findByID({
    collection: 'users',
    id,
    depth: 0,
    overrideAccess: true,
    req,
  });

  if (doc?.role !== 'admin') return;

  if ((await countAdmins(req)) <= 1) {
    throw new APIError(
      'This is the only admin account and deleting it would leave the panel with no administrator. ' +
        'Give another user the Admin role first.',
      400
    );
  }
};

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,

  access: {
    /**
     * Who may log into the panel at all. A user with no recognised role is not
     * staff — an account left mid-setup, or one whose role was cleared — and is
     * refused at the door rather than being let in to an empty sidebar.
     */
    admin: ({ req }) => hasAnyRole(req.user),

    create: adminOnly,
    delete: adminOnly,
    unlock: adminOnly,

    /**
     * Admins see everyone. Everyone else sees exactly themselves.
     *
     * Returning a query constraint rather than a boolean means the same rule
     * covers the list view, the REST API and a direct findByID: a sales user
     * listing `/payload-api/users` gets a one-row result, not a 403 on a page
     * they can otherwise reach. Anonymous callers match nothing and are
     * refused outright.
     */
    read: ({ req }) => {
      if (isAdmin(req.user)) return true;
      if (!req.user) return false;
      return { id: { equals: req.user.id } };
    },

    /**
     * Same shape, and this is what makes "change your own password and name"
     * work without handing out user management. The `role` field is separately
     * locked below — this permits editing the document, not escalating it.
     */
    update: ({ req }) => {
      if (isAdmin(req.user)) return true;
      if (!req.user) return false;
      return { id: { equals: req.user.id } };
    },
  },

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'updatedAt'],
    group: 'Admin',
  },

  hooks: {
    beforeValidate: [assignFirstUserAdmin],
    beforeChange: [preventLastAdminDemotion],
    beforeDelete: [preventLastAdminDeletion],
  },

  fields: [
    // Pre-existing field, unchanged.
    { name: 'name', type: 'text' },

    {
      name: 'role',
      type: 'select',
      required: true,
      options: ROLE_OPTIONS,

      /**
       * Puts a copy of the role in the auth token, for anything that reads the
       * token directly.
       *
       * It is NOT what access control reads. Payload's JWT strategy re-reads
       * the user document on every request, so a role change takes effect on
       * the next request rather than at the user's next login. Revoking access
       * is immediate.
       */
      saveToJWT: true,

      access: {
        /**
         * The hinge. Collection `update` deliberately lets a user edit their
         * own document; this stops that being a route to `role: 'admin'`.
         *
         * Only `update` is restricted. `create` is unrestricted because
         * collection-level create is already admin-only, and the one
         * unauthenticated create that exists — the first user — is handled by
         * `assignFirstUserAdmin`, which runs before validation and would be
         * blocked by a field rule here.
         */
        update: adminOnlyField,
      },

      admin: {
        position: 'sidebar',
        description:
          'Decides what this account can see and change. Admin includes every other role. Changes take effect immediately.',
      },
    },
  ],
};

export default Users;
