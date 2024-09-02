import prisma from "@/index";
import { compare, hash } from "bcrypt-ts";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { Gender } from "@prisma/client";

export const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "abc@example.com" },
        name: { label: "name", type: "text", placeholder: "John Doe" },
        gender: { label: "gender", type: "text", placeholder: "Gender" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (credentials.name) {
          // Signup case
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (existingUser) throw new Error("Email already exists");

          const hashedPassword = await hash(credentials.password, 10);
          const gender = credentials.gender as Gender;
          const user = await prisma.user.create({
            data: {
              name: credentials.name,
              email: credentials.email,
              gender: gender,
              password: hashedPassword,
              profilePic: `https://avatar.iran.liara.run/username?username=${credentials.name}`,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            gender: user.gender,
          };
        } else {
          // Login case
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) throw new Error("No user found");

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) throw new Error("Invalid password");

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            gender: user.gender,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
