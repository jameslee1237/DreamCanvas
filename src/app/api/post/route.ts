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
          id: post_id,
        },
      });
      return NextResponse.json({ success: true, post });
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
    const { like, likes, post_id, user_id } = payload;
    if (like) {
        if (likes > 0) {
            await prisma.post.update({
                where: {
                    id: post_id,
                },
                data: {
                    likes: Number(likes),
                    likedByIds: {
                        push: user_id,
                    }
                }
            });
        }
        else {
            const current_post = await prisma.post.findUnique({
                where: {
                    id: post_id,
                },
                select: {
                    likedByIds: true,
                }
            })
            const likedByIds = current_post?.likedByIds
            if (!likedByIds) return NextResponse.json({ success: false });
            await prisma.post.update({
                where: {
                    id: post_id,
                },
                data: {
                    likes: Number(likes),
                    likedByIds: {
                        set: likedByIds.filter((id: string) => id !== user_id),
                    }
                }
            })
        }
    }
    else {
        if (likes > 0) {
            await prisma.post.update({
                where: {
                    id: post_id,
                },
                data: {
                    saved: Number(likes),
                    savedByIds: {
                        push: user_id,
                    }
                }
            });
        }
        else {
            const current_post = await prisma.post.findUnique({
                where: {
                    id: post_id,
                },
                select: {
                    savedByIds: true,
                }
            })
            const savedByIds = current_post?.savedByIds
            if (!savedByIds) return NextResponse.json({ success: false });
            await prisma.post.update({
                where: {
                    id: post_id,
                },
                data: {
                    saved: Number(likes),
                    savedByIds: {
                        set: savedByIds.filter((id: string) => id !== user_id),
                    }
                }
            })
        }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
