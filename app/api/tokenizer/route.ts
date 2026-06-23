import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET || '',
    clientKey: process.env.NEXT_PUBLIC_CLIENT || ''
})


export async function POST(request: Request) {
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Generate a unique order_id (for demo, use timestamp)
    const order_id = `ORDER-${Date.now()}`;

    // Calculate gross_amount
    const gross_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Map items to Midtrans item_details format
    const item_details = items.map(item => ({
        id: item.id,
        name: item.name || item.productName,
        price: item.price,
        quantity: item.quantity
    }));

    const parameter = {
        transaction_details: {
            order_id,
            gross_amount
        },
        item_details
    };

    try {
        const token = await snap.createTransactionToken(parameter);
        console.log(token);
        return NextResponse.json({ token });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create transaction token' }, { status: 500 });
    }
}