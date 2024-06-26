import prisma from "@/lib/client";
import { NextResponse } from "next/server";

interface Params {
    id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
    try {
        const { id } = params;
        const User = await prisma.user.findUnique({
            where: {
                clerkId: id
            }
        })
        return NextResponse.json({success: true, user: User});
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error) });
    }
}