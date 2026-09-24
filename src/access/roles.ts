import type { Access, FieldAccess } from 'payload';

/**
 * Roles.
 *
 * Until now this project had exactly two states — anonymous, or "signed-in
 * staff" — and `adminOnly` in `./index.ts` meant nothing more than
 * `Boolean(req.user)`. Everyone who could reach the panel could do everything
 * in it: read every lead, download every CV, delete every blog post. That was
 * acceptable while the only accounts were developers'. It stops being
 * acceptable the moment marketing, sales and HR have logins.
 *
 * Four roles, one per person-shaped job:
 *
 *   admin      everything, plus user management
 *   marketing  the published-content surface
 *   sales      the inbound-lead surface
 *   hr         the hiring surface
 *
 * **Admin is implied everywhere.** `hasRole(user, 'hr')` is true for an admin
 * who has never been near a job posting. That is deliberate: the alternative is
 * either giving admins a second, multi-valued role list, or writing
 * `isAdmin(u) || hasRole(u, x)` at every call site and eventually forgetting to.
 * Implication is enforced in one function instead.
 *
 * The role lives on the user document and is also copied into the JWT
 * (`saveToJWT: true` on the field). Note what that does and does not mean:
 * Payload's JWT strategy re-reads the user from the database on every request
 * (`payload/dist/auth/strategies/jwt.js`, `findByID` on the decoded id), so
 * everything below sees the **current** role, not the one that was true at
 * login. Changing or clearing a role therefore takes effect on the next
 * request — which is the behaviour you want when revoking access in a hurry.
 *
 * `saveToJWT` puts a copy in the token for consumers that read the token
 * directly rather than going through access control. A token is readable by
 * whoever holds it, so that field is not a place to put anything secret.
 */

/**
 * The single source of truth. `ROLE_OPTIONS` and the `Role` type are both
 * derived from this, so adding a role is a one-line change that the compiler
 * then chases through the access matrix.
 */
export const ROLES = ['admin', 'marketing', 'sales', 'hr'] as const;

export type Role = (typeof ROLES)[number];

/** Shape Payload's `select` field wants. Labels are what staff see in the panel. */
export const ROLE_OPTIONS: { label: string; value: Role }[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'HR', value: 'hr' },
];

/**
 * Deliberately structural rather than the generated `User` type.
 *
 * `src/payload-types.ts` is generated *from* the config that imports this
 * module, so depending on it here would be circular — and would break
 * `generate:types` on a clean checkout, which is exactly when you can least
 * afford it. Everything below only ever reads `role`.
 */
export interface RoleBearer {
  role?: Role | string | null;
}

type MaybeUser = RoleBearer | null | undefined;

const roleOf = (user: MaybeUser): Role | null => {
  const value = user?.role;
  return typeof value === 'string' &&
    (ROLES as readonly string[]).includes(value)
    ? (value as Role)
    : null;
};

/** True only for a real admin. The one check with no implication applied. */
export const isAdmin = (user: MaybeUser): boolean => roleOf(user) === 'admin';

/** True for the named role, and for admins regardless of the role named. */
export const hasRole = (user: MaybeUser, role: Role): boolean =>
  isAdmin(user) || roleOf(user) === role;

/**
 * True for any of the named roles (admin implied). Called with no list, true
 * for anyone holding a recognised role at all — which is how the panel decides
 * whether an account may log in. A user whose `role` is null or unrecognised is
 * not staff and gets nothing.
 */
export const hasAnyRole = (
  user: MaybeUser,
  roles?: readonly Role[]
): boolean => {
  if (isAdmin(user)) return true;
  const role = roleOf(user);
  if (role === null) return false;
  return roles ? roles.includes(role) : true;
};

/**
 * Collection-level: admins only.
 *
 * Note this is NOT the `adminOnly` in `./index.ts`, which predates roles and
 * means "any authenticated user". That one is now only reachable through the
 * public-read helpers it is bundled with; this is the one to reach for.
 */
export const adminOnly: Access = ({ req }) => isAdmin(req.user);

/**
 * Field-level: admins only.
 *
 * Exists for exactly one field — `users.role` — and it is the hinge the whole
 * model swings on. Collection `update` access lets a user edit their own
 * document so they can change their name and password. Without this, that same
 * path lets them set `role: 'admin'` on themselves, and every rule in
 * `collectionAccess.ts` becomes advisory.
 */
export const adminOnlyField: FieldAccess = ({ req }) => isAdmin(req.user);
