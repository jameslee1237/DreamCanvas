import { getPost } from "@/app/actions/getPost";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const authorId = searchParams.get("authorId");
        const post_bool = searchParams.get("post");
        if (authorId) {
            if (!post_bool) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: authorId
                    },
                    select: {
                        userName: true,
                        profileImage: true,
                    }
                });
                if (!user) {
                    throw new Error("User not found " + authorId);
                }    
                return NextResponse.json({ success: true, user });
            }
            else {
                const user = await prisma.user.findUnique({
                    where: {
                        id: authorId
                    },
                    include: {
                        posts: true,
                        saves: true,
                        following: true,
                        followers: true,
                    }
                })
                if (!user) {
                    throw new Error("User not found " + authorId);
                }    
                return NextResponse.json({ success: true, user });
            }
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

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}