import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
