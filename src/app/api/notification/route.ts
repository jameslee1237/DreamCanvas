import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    try {
      const { user_id, involved, content } = payload;
      if (!user_id || !content) {
        throw new Error("Missing required fields");
      }
      const notification = await prisma.notification.create({
        data: {
          userId: user_id,
          involved: involved,
          content: content,
        },
      });
      return NextResponse.json({ success: true, notification });
    } catch (error) {
      const { id } = payload;
      if (!id) {
        throw new Error("Missing required fields");
      }
      const notification = await prisma.notification.update({
        where: {
          id: id,
        },
        data: {
          read: true,
        },
      });
      return NextResponse.json({ success: true, notification });
    }
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing required fields" });
  }
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: id,
      },
    });
    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
