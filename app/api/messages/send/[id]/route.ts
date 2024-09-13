import { auth } from "@/app/lib/auth";
import prisma from "@/index";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(auth);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ Error: "Unauthorized" }, { status: 401 });
    }

    const senderId = session.user.id;
    const receiverId = params.id;
    const body = await request.json();
    const { message } = body;

    // Find or create conversation
    let conversation = await prisma.conversation.findFirst({
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
                userId: receiverId,
              },
            },
          },
        ],
      },
      include: {
        participants: true,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [{ userId: senderId }, { userId: receiverId }],
          },
        },
        include: {
          participants: true,
        },
      });
    }

    // Create a new message
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
        conversationId: conversation.id,
      },
    });

    // Update the conversation to include the new message
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        messages: {
          connect: { id: newMessage.id },
        },
      },
      include: {
        messages: true,
      },
    });

    return NextResponse.json(
      { senderId, receiverId, message },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error occurred while sending message:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
