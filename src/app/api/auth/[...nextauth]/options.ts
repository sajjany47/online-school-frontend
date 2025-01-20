import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import User from "@/modal/User.Model";
import { NewUser } from "@/types/UserType";
import { SecretKey } from "@/shared/Constant";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any, req: any) {
        await dbConnect();
        try {
          const user: NewUser | null = await User.findOne({
            $or: [
              { username: credentials.identifier },
              { email: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found!");
          }
          if (!user.isActive) {
            throw new Error("Contact with admin");
          }
          const verifyPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (verifyPassword) {
            return user;
          } else {
            throw new Error("Invalid password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session._id = token._id.toString();
        session.username = token.username;
        session.name = token.name;
        session.position = token.position;
        session.sessionId = token;
        session.userImage = token.userImage ?? null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = token._id.toString();
        token.username = token.username;
        token.name = token.name;
        token.position = token.position;
        token.sessionId = token;
        token.userImage = token.userImage ?? null;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: SecretKey,
};
