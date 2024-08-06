/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * "Just Static Routes"
 *
 * @type{String[]}
 */
export const publicRoutes = [
  "/",
  "/shop",
  "/blog",
  "/services",
  "/contact",
  "/about",
  "/faq",
];

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 * "Just Dynamic Routes"
 *
 * @type{String[]}
 */
export const publicDynamicRoutes = ["/shop", "/blog"];

/**
 * An array of routes that used for authentication.
 * These routes will redirect user to "/"
 *
 * @type{String[]}
 */
export const authRoutes = ["/auth/signin", "/auth/signup"];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 *
 * @type{String}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *
 * The default redirect path after logging in
 *
 * @type{String}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
