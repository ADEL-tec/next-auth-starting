import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicDynamicRoutes,
} from "../routes";
import { NextResponse } from "next/server";
import { schemaSignin } from "../zodSchema";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { User } from "@/data/models/index";

const getUser = async (credentials) => {
  return await User.findOne({ where: { email: credentials.email } });
};

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = schemaSignin.safeParse(credentials);
        if (parsedCredentials.success) {
          const user = await getUser(credentials);
          console.log(user);
          if (!user) return null;
          const passwordMuch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMuch) return null;
          return user;
        }
        console.log("Invalid credentials (zod validation)");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;

      const isApiAuthRoute = nextUrl?.pathname.startsWith(apiAuthPrefix);
      const isAuthRoute = authRoutes.includes(nextUrl?.pathname);
      const isPublicStaticRoute = publicRoutes.includes(nextUrl?.pathname);
      let isPublicDynamicRoute = false;
      if (!isPublicStaticRoute) {
        isPublicDynamicRoute = publicDynamicRoutes.find((item) =>
          nextUrl?.pathname.startsWith(item)
        );
      }
      let isPublicRoute = isPublicStaticRoute || isPublicDynamicRoute;

      if (isAuthRoute) {
        if (isLoggedIn) {
          console.log("isLoggedIn");
          return NextResponse.redirect(
            new URL(DEFAULT_LOGIN_REDIRECT, request.url)
          );
        }
        return true;
      }

      if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      // if (request.method === "POST") {
      //   const { authToken } = (await request.json()) ?? {};
      //   // If the request has a valid auth token, it is authorized
      //   const valid = await validateAuthToken(authToken);
      //   if (valid) return true;
      //   return NextResponse.json("Invalid auth token", { status: 401 });
      // }

      // Logged in users are authenticated, otherwise redirect to login page
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token = {};
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.avatar = user.avatar;
      }
      console.log("token", token);
      return token;
    },
    session({ session, token }) {
      console.log("session", session);
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.avatar = token.avatar;

      return session;
    },
  },
};
