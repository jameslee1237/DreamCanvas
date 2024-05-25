import prisma from "@/lib/client";
import { NextResponse, NextRequest } from "next/server";

interface Params {
    postid: string;
}

export async function GET(req: NextRequest, { params } : { params: Params }) {
    try{
        const post = await prisma.post.findFirst({
            where: {
                id: "2e7471e7-d9f4-4f6a-8d1c-09aa5f16ae01"
            }
        })
        if (!post) {
            throw new Error("Post not found");
        }
        return NextResponse.json({success:true, post});
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}