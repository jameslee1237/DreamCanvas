import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function POST(req: NextRequest) {
    try {
        const { postId, userId, add } = await req.json();
        if (!postId || !userId || add === null) {
            throw new Error("Missing postId or userId");
        }
        if (add) {
            const like = await prisma.like.create({
                data: {
                    userId: userId,
                    postId: postId,
                },
            });
            return NextResponse.json({ success: true, like });
        }
        else {
            const like = await prisma.like.delete({
                where: {
                    search_like: {
                        userId: userId,
                        postId: postId,
                    }
                }
            });
            return NextResponse.json({ success: true, like });
        }
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : String(error),
          });
    }
}
