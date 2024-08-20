import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { z } from 'zod';

const subscriptionSchema = z.object({
    email: z.string().email(),
    userName: z.string(),
    active: z.boolean(),
    paymentId: z.string(),
    joinDate: z.string()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = subscriptionSchema.parse(body);

        const result = await db.insert(UserSubscription).values({
            email: parsedData.email,
            userName: parsedData.userName,
            active: parsedData.active,
            paymentId: parsedData.paymentId,
            joinDate: parsedData.joinDate
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error saving subscription:', error);
        return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 });
    }
}
