import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

import { prisma } from '@/lib/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.log('Error verifying webhook: ', err)
        return new Response('Error occured' + err, {
            status: 400
        })
    }

    const eventType = evt.type
    if (eventType === 'user.created') {
        await prisma.user.create({
            data: {
                clerkId: payload.data.id,
                firstName: payload.data.first_name,
                lastName: payload.data.last_name,
                email: payload.data.email_addresses[0].email_address,
                userName: payload.data.username,
                profileImage: payload.data.image_url
            }
        })
    }

    if (eventType === 'user.updated') {
        try{
            await prisma.user.update({
                where: {
                    clerkId: payload.data.id,
                }, 
                data: {
                    firstName: payload.data.first_name,
                    lastName: payload.data.last_name,
                    email: payload.data.email_addresses[0].email_address,
                    userName: payload.data.username,
                    profileImage: payload.data.image_url
                }
            })
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                await prisma.user.create({
                    data: {
                        clerkId: payload.data.id,
                        firstName: payload.data.first_name,
                        lastName: payload.data.last_name,
                        email: payload.data.email_addresses[0].email_address,
                        userName: payload.data.username,
                        profileImage: payload.data.image_url
                    }
                })
            }
            else {
                console.log(e)
            }
        }
    }
    
    if (eventType === 'user.deleted') {
        await prisma.user.delete({
            where: {
                clerkId: payload.data.id
            }
        })
    }
    
    return new Response('', { status: 200 })
}
