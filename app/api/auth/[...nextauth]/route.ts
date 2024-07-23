import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import { connectToDB } from "@/utils/database";
import { error } from "console";

const handler = NextAuth({
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
  })],
  callbacks: {
    async session({ session }) {
  
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
        try {
          // sserverless -> lambda -> dynamodb
          await connectToDB();
          console.log("User: ", profile)
          if (!profile || !profile.name) {
            throw error("Profile is either nonexistent, or does not have name")
          }
          // check if user already exists
          const userExists = await User.findOne({ email: profile.email }) ;

          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture || null,
            });
          }

          return true
        } catch (error) {
          console.log("route.ts - signIn:", error)
          return false
        }
    }
  }
})

export { handler as GET, handler as POST };