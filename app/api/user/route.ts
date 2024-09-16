import { auth } from "@/app/lib/auth";
import prisma from "@/index";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(auth);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const loggedInUserId = session.user.id;
  const filteredUsers = await prisma.user.findMany({
    where: { id: { not: loggedInUserId } },
    select: {
      password: false,
      name: true,
      email: true,
      id: true,
      gender: true,
      profilePic: true,
    },
  });
  return NextResponse.json(filteredUsers, { status: 200 });
}
