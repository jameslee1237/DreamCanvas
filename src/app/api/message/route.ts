import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, conversationId, authorId } = body;
    if (!content || !conversationId || !authorId) {
      throw new Error("Missing content, conversationId, or authorId");
    }
    const message = await prisma.message.create({
      data: {
        content: content,
        conversationId: conversationId,
        authorId: authorId,
      },
    });
    const conversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: message.createdAt,
      },
    });
    return NextResponse.json({ success: true, message });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
