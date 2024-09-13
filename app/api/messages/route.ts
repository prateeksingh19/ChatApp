import { auth } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(auth);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ Error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ message: "Message route is working" });
}
