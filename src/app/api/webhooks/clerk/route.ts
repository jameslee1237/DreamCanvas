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
    const svix_signature = headerPayload.get('svix-signature')
    const svix_timestamp = headerPayload.get('svix-timestamp')

    if (!svix_id || !svix_signature || !svix_timestamp) {
        return new Response("Error - no header found", { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent
    } catch (err) {
        console.log('Error verifying webhook: ', err)
        return new Response('Error occured', {
            status: 400
        })
    }

    const eventType = evt.type

    if (eventType === 'user.created') {
        await prisma.user.create({
            data: {
                clerkId: payload.data.id,
                firstName: payload.data.firstName,
                lastName: payload.data.lastName,
                email: payload.data.email,
                userName: payload.data.username
            }
        })
    }

    if (eventType === 'user.updated') {
        await prisma.user.update({
            where: {
                clerkId: payload.data.id,
            }, 
            
            
}
