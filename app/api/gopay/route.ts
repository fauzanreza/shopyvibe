// app/api/gopay/route.ts

import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'No items provided' }, { status: 400 });
    }

    const serverKey = process.env.SECRET;
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    if (!serverKey || !clientKey) {
      return NextResponse.json({ message: 'Midtrans keys not set' }, { status: 500 });
    }

    const core = new Midtrans.CoreApi({
      isProduction: false,
      serverKey,
      clientKey
    });

    const order_id = `ORDER-${Date.now()}`;
    const gross_amount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const parameter = {
      payment_type: "gopay",
      transaction_details: {
        order_id,
        gross_amount
      },
      gopay: {
        enable_callback: true,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`
      },
      item_details: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };
    
    const chargeResponse = await core.charge(parameter);
    return NextResponse.json({
    qr_url: chargeResponse.actions?.find((a: { name: string; url?: string; method?: string }) => a.name === 'generate-qr-code')?.url || null,
    expiry_time: chargeResponse.expiry_time,
    order_id: chargeResponse.order_id,
    });

  } catch (error) {
    console.error('Gopay API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
