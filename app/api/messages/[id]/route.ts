import { auth } from "@/app/lib/auth";
import prisma from "@/index";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(auth);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const senderId = session.user.id;
    const { id: chatUserId } = params;
    const conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            participants: {
              some: {
                userId: senderId,
              },
            },
          },
          {
            participants: {
              some: {
                userId: chatUserId,
              },
            },
          },
        ],
      },
      include: {
        messages: true,
      },
    });
    if (!conversation) {
      return NextResponse.json([], { status: 200 });
    }
    const messages = conversation.messages;
    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    console.error("Error occurred while fetching messages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
