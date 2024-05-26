import { getPost } from "@/app/actions/getPost";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const authorId = searchParams.get("authorId");
        if (authorId) {
            const user = await prisma.user.findUnique({
                where: {
                    id: authorId
                }
            });
            return NextResponse.json({ success: true, user });
        }
        else {
            const posts = await getPost();
            const arr = posts.map((item) => item.image);
            const arr2 = posts.map((item) => item.id);
            if (!arr) {
                throw new Error("Posts not found");
            }
            return NextResponse.json({ success: true, posts: arr, postIds: arr2});
        }
    }
    catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}