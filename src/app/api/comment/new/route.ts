import prisma from "@/lib/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { comment, authorId, postId } = await req.json();
    if (!comment || !authorId || !postId) {
        throw new Error("Missing fields");
    }  
    try {
        const newComment = await prisma.comment.create({
            data: {
                comment: comment,
                authorId: authorId,
                postId: postId,
            }
        });
        return NextResponse.json({success: true, newComment});
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}21