import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil', // Use required Stripe API version
});

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // get session ID

  if (!id) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  try {
    const [session, lineItems] = await Promise.all([
      stripe.checkout.sessions.retrieve(id),
      stripe.checkout.sessions.listLineItems(id, {
        expand: ['data.price.product'],
      }),
    ]);

    const items = lineItems.data.map(item => ({
      id: item.id,
      name: (item.price?.product as Stripe.Product)?.name || 'Product',
      quantity: item.quantity || 1,
      price: (item.price?.unit_amount || 0) / 100,
      image: ((item.price?.product as Stripe.Product)?.images || [])[0],
    }));

    const response = {
      orderNumber: session.id,
      customerName: session.customer_details?.name || 'Customer',
      email: session.customer_details?.email || '',
      items,
      total: (session.amount_total || 0) / 100,
      estimatedDelivery: new Date(Date.now() + 14 * 86400000).toLocaleDateString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Stripe API error:', error);
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
}
