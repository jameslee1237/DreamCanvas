import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/client';

export async function GET(req: NextRequest) {
    try{    
        const { searchParams } = new URL(req.nextUrl);
        const curr_id = searchParams.get('curr_id');
        if (!curr_id) {
            throw new Error('Missing curr_id');
        }
        const conversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        userId: curr_id
                    }
                }
            }
        })
        return NextResponse.json({ success: true, conversations });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : String(error),
        });
    }
}