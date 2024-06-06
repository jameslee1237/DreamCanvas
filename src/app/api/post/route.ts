import prisma from "@/lib/client";
import { NextResponse, NextRequest } from "next/server";
import { getPost } from "@/app/actions/getPost";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const post_id = searchParams.get("post_id");
    const userId = searchParams.get("userId");
    if (post_id) {
      if (!userId) {
        const post = await prisma.post.findUnique({
          where: {
            id: post_id,
          },
        });
        return NextResponse.json({ success: true, post });
      }
      else{
        const like = await prisma.like.findUnique({
          where: {
            search_like: {
              userId: userId,
              postId: post_id,
            }
          }
        })
        const save = await prisma.save.findUnique({
          where: {
            search_save: {
              userId: userId,
              postId: post_id,
            }
          }
        })
        return NextResponse.json({ success: true, like, save });
      }
    } else {
      const posts = await getPost();

      return NextResponse.json({ success: true, posts });
    }
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
