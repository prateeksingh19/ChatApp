import { auth } from "@/app/lib/auth";
import prisma from "@/index";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(auth);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ Error: "Unauthorized" }, { status: 401 });
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
    console.log("Error occurred while sending message:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
