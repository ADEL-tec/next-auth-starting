import NextAuth from "next-auth";
import authConfig from "./lib/auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
});
// export default auth(async (req) => {
//   console.log(req.auth);
//   if (
//     !req.auth &&
//     (req.nextUrl.pathname !== "/auth/signin" ||
//       req.nextUrl.pathname !== "/auth/signup")
//   ) {
//     const newUrl = new URL("/auth/signin", req.nextUrl.origin);
//     return NextResponse.redirect(newUrl);
//   }

//   if (
//     req.auth &&
//     (req.nextUrl.pathname !== "/auth/signin" ||
//       req.nextUrl.pathname !== "/auth/signup")
//   ) {
//     const newUrl = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(newUrl);
//   }
// });
// export function middleware(request) {
//   console.log("ppppppppppppppp");
//   console.log(request);
//   if (request.nextUrl.pathname.startsWith("/about")) {
//     return NextResponse.redirect(new URL("/about-2", request.url));
//   }

//   if (request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard/user", request.url));
//   }
// }

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
