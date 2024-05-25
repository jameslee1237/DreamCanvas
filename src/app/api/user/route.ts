import { getPost } from "@/app/actions/getPost";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const posts = await getPost();
        const arr = posts.map((item) => item.image);

        if (!arr) {
            throw new Error("Posts not found");
        }
        return NextResponse.json({ success: true, posts: arr });
    }
    catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}