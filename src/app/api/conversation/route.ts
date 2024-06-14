import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl);
  const curr_id = searchParams.get("curr_id");
  const convo_id = searchParams.get("convo_id");
  try {
    if (!curr_id) {
      if (!convo_id) {
        throw new Error("Missing curr_id or convo_id");
      }
      const conversation = await prisma.conversation.findUnique({
        where: {
          id: convo_id,
        },
        include: {
          messages: true,
        },
      });
      return NextResponse.json({ success: true, conversation });
    } else {
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              userId: curr_id,
            },
          },
        },
        include: {
          participants: true,
          messages: true,
        },
      });
      return NextResponse.json({ success: true, conversations });
    }
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentUser, otherUser } = body;
    if (!currentUser || !otherUser) {
      throw new Error("Missing currentUser or otherUser");
    }
    const exist = await prisma.conversation.findFirst({
      where: {
        participants: {
          some: {
            AND: [{ userId: currentUser }, { userId: otherUser }],
          },
        },
      },
    });
    if (exist) {
      return NextResponse.json({ success: true, conversation: exist });
    } else {
      const conversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [{ userId: currentUser }, { userId: otherUser }],
          },
        },
      });
      return NextResponse.json({ success: true, conversation });
    }
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
