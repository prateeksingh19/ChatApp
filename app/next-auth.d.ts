// next-auth.d.ts
import NextAuth from "next-auth";
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      gender?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    gender: string;
  }
}
