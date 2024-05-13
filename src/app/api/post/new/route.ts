import { prisma } from "@/lib/client";

export async function POST(req: Request) {

    const payload = await req.json();
    try {
        await prisma.post.create({
            data: {
                content: payload.data.content,
                authorId: payload.data.authorId,
                image: payload.data.image,
            }
        })
    } catch (e) {
        console.log(e);
    }
    return new Response("Post created", { status: 200 });
}