import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // get ID from URL

  if (!id) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['line_items.data.price.product'],
    });

    const items =
      session.line_items?.data.map(item => ({
        id: item.id,
        name: (item.price?.product as Stripe.Product)?.name || 'Product',
        quantity: item.quantity || 1,
        price: (item.amount_total || 0) / 100,
        image: ((item.price?.product as Stripe.Product)?.images || [])[0],
      })) || [];

    return NextResponse.json({
      orderNumber: session.id,
      customerName: session.customer_details?.name || 'Customer',
      email: session.customer_details?.email || '',
      items,
      total: (session.amount_total || 0) / 100,
      estimatedDelivery: new Date(Date.now() + 14 * 86400000).toLocaleDateString(),
    });
  } catch (error) {
    console.error('Stripe API error:', error);
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
}
