import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";
import Auth0Provider from "next-auth/providers/auth0";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
// import AppleProvider from "next-auth/providers/apple"

const DBUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const DBSecret = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: SupabaseAdapter({
    url: DBUrl,
    secret: DBSecret,
  }) as Adapter,
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
