import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: [process.env.AUTH_SECRET],
  ...authConfig.callbacks,
});
