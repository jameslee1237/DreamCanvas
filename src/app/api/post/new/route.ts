import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { url, feed, authorId } = await req.json();

        const response = await prisma.post.create({
            data: {
                feed: feed,
                image: url,
                authorId: authorId,
                tags: "tempTag",
            }
        })
        return NextResponse.json({ success: true, response });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}
