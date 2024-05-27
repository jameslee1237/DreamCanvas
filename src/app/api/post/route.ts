import prisma from "@/lib/client";
import { NextResponse, NextRequest } from "next/server";
import { getPost } from "@/app/actions/getPost";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const post_id = searchParams.get("post_id");
        if (post_id) {
            const post = await prisma.post.findUnique({
                where: {
                    id: post_id
                }
            })
            return NextResponse.json({ success: true, post })
        }
        else {
            const posts = await getPost();

            return NextResponse.json({ success: true, posts });
        }
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}