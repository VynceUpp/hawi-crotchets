import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // must be text, not json
  const signature = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.NEXT_STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderId = session.id;
    const orderData = {
      orderNumber: session.id,
      customerName: session.customer_details?.name || 'Customer',
      email: session.customer_details?.email || '',
      total: (session.amount_total || 0) / 100,
      status: session.status,
      createdAt: new Date(),
    };

    try {
      await setDoc(doc(db, 'orders', orderId), orderData);
      console.log(`✅ Order ${orderId} saved to Firestore`);
    } catch (error) {
      console.error('❌ Error writing order to Firestore:', error);
      return new NextResponse('Failed to write to Firestore', { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
