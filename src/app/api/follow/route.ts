import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function POST (req: NextRequest) {
    try {
        const { follower_id, following_id, create } = await req.json();
        if (!follower_id || !following_id) {
            throw new Error("Missing follower_id or following_id");
        }
        if (create) {
            const follow = await prisma.follow.create({
                data: {
                    followerId: follower_id,
                    followingId: following_id,
                },
            });
            return NextResponse.json({ success: true, follow });
        }
        else {
            const follow = await prisma.follow.delete({
                where: {
                    search_follow: {
                        followerId: follower_id,
                        followingId: following_id,
                    }
                }
            });
            return NextResponse.json({ success: true, follow });
        }
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : String(error),
        });
    }
}

export async function GET (req: NextRequest) {
    try {
        const { searchParams } = new URL(req.nextUrl);
        const follower_id = searchParams.get("follower_id");
        const following_id = searchParams.get("following_id");
        if (!follower_id || !following_id) {
            throw new Error("Missing follower_id or following_id");
        }
        const follow = await prisma.follow.findUnique({
            where: {
                search_follow: {
                    followerId: follower_id,
                    followingId: following_id,
                }
            }
        });
        return NextResponse.json({ success: true, follow });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : String(error),
        });
    }
}