import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

import { prisma } from '@/lib/client';

export async function POST (req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Clerk Webhook Secret not found"
        )
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
}