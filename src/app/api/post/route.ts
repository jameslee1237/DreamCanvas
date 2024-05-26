import prisma from "@/lib/client";
import { NextResponse, NextRequest } from "next/server";
import { getPost } from "@/app/actions/getPost";

export async function GET(req: NextRequest) {
    try{
        const posts = await getPost();
        // const getRandompost = (array: any[]) => array[Math.floor(Math.random() * array.length)];
        // const postid = getRandompost(posts).id;

        // const post = await prisma.post.findFirst({
        //     where: {
        //         id: postid
        //     }
        // })
        // if (!post) {
        //     throw new Error("Post not found");
        // }
        return NextResponse.json({success:true, posts});
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}