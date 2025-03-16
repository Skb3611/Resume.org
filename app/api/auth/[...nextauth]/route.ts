import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const authOptions:AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
      version: "2.0",
      authorization: {
        params: {
          include_email: "true", // Request user's email
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      client: { token_endpoint_auth_method: "client_secret_post" },
      // @ts-ignore
      scope: "r_liteprofile r_emailaddress",
      issuer: "https://www.linkedin.com",
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      tokenUri: "https://www.linkedin.com/oauth/v2/accessToken",
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "profile email openid",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },

      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
      },
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
          
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token, account,user }: { token: any; account?: any;user:any }) {
      if (account) {
        token.id = user.id;
        token.access_token = account.access_token; // Manually add access_token
      }
      return token;
    },
    async session({ session, token,user }: { session: any; token: any, user:any}) {
      const dbUser = await prisma.user.findUnique({ where: { id: token?.id }, include:{accounts:true} });

      session.user = {
        id: dbUser?.id,
        name: dbUser?.name,
        email: dbUser?.email,
        image: dbUser?.image,
        provider: dbUser?.accounts[0].provider,
        accountType: dbUser?.accountType,
      };

      return session;
    },
    async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
      return baseUrl; // Default redirect
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

