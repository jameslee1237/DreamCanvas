    import prisma from "@/lib/client";

    interface Params {
        id: string;
    }

    export async function GET(req: Request, { params} : { params : Params}) {
        try {
            const { id } = params;
            const User = await prisma.user.findUnique({
                where: {
                    clerkId: id
                }
            })
            return new Response(JSON.stringify(User), {status: 200})
        }
        catch (error){
            return new Response("Could not get user data", {status: 500})
        }
    }