import prisma from "@/lib/client";
import { NextResponse } from "next/server";

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
            return NextResponse.json(User);
        }
        catch (error){
            console.log(error);
        }
    }