import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type


  const client = await clerkClient();
  if(!id){
    throw new Error("No user id found")
  }

  
  
  const user = await client.users.getUser(id);
  const username = user.fullName;
  const profileImage = user.imageUrl;
  const email = user.primaryEmailAddress?.emailAddress;
  const userId = user.id;
  // console.log(user);

  if (eventType === "user.created") {
    const { id, unsafe_metadata } = evt.data;
    const role = unsafe_metadata?.role as "HOST" | "RENTER";
    console.log(`User ${id} created with role ${role}`);
    console.log(id)
   
    // Create a new user in your database
    await prisma.user.create({
      data: {
        id: userId,
        role,
        username: username || '',
        profileImage: profileImage || '',
        email: email || '',
      },
    });
  }
  
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)

  return new Response('Webhook received', { status: 200 })
}