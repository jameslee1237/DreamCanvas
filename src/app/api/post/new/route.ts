import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { url, feed } = await req.json();
        const response = await prisma.post.create({
            data: {
                feed: feed,
                image: url,
                authorId: "455966eb-bc0f-4bc2-abac-0f6a55cbac0c",
                tags: "tempTag"
            }
        })
        return NextResponse.json({ success: true, response });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}
