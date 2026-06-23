"use client"

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

export default function CheckoutPage() {

  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [expiryTime, setExpiryTime] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!expiryTime) return;

    // Parse the expiry time string to a Date object
    const expiryDate = new Date(expiryTime);
    const now = new Date();
    const initialTimeLeft = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / 1000));
    
    setTimeLeft(initialTimeLeft);

    // Set up the countdown interval
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [expiryTime]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_CLIENT
    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey || "")
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const {items, removeItem, addItem} = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.price * item.quantity, 0);

   if(totalItems === 0 || items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-700">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center w-full max-w-md">Checkout</h1>
      <Card className="w-full max-w-md mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">  
        {items.map((item, key) => (
          <li key={key} className="flex flex-col gap-2 border-b pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
              {item.imageUrl && (
                <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                  <Image
                    alt={item.name}
                    src={`/${item.imageUrl}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
              )}
              <span className="font-medium">{item.name}</span>
                  </div>
                    <span className="font-bold">
                    {(item.price * item.quantity).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
              variant="outline"
              className="bg-white text-black border-gray-400 hover:bg-gray-100 hover:text-black"
              onClick={() => removeItem && removeItem(item.id)}
                  >
              -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
              variant="outline"
              className="bg-black text-white border-gray-400 hover:bg-gray-900 hover:text-white"
              onClick={() => addItem && addItem({ ...item, quantity: 1 })}
                  >
              +
                  </Button>
            </div>
          </li>
        ))}
        </ul>
        <div>
          Total: {totalItems.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
        </div>
      </CardContent>
      </Card>
       <div className="flex flex-col gap-4">
        <Button
          type="button"
          className="rounded bg-indigo-500 p-4 text-sm font-medium transition hover:scale-105"
          onClick={async () => {
                      const data = items.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        imageUrl: item.imageUrl
                      }));
          
                      try {
                        const response = await fetch("/api/tokenizer", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({ items: data }),
                        });
          
                        if (!response.ok) {
                          const errorText = await response.text();
                          throw new Error(errorText || "Failed to create transaction token");
                        }
          
                        const result = await response.json();
                        // console.log(result);
                        window.snap.pay(result.token)
                        // Optionally handle the result, e.g., redirect or show payment UI
                      } catch (e) {
                        console.error("Checkout error:", e);
                        alert("Failed to create transaction token. Please try again.");
                      }
                    }}
        >
          Checkout
        </Button>
        {/* <Button
          type="button"
          variant="outline"
          className="text-indigo-500 py-4 text-sm font-medium transition hover:scale-105 border-indigo-500"
          onClick={async () => {

          const secret = process.env.NEXT_PUBLIC_SECRET;
          const encodedSecret = Buffer.from(secret || "", "utf-8").toString("base64");
          const basicAuth = `Basic ${encodedSecret}`;

          const grossAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
          const orderId = `ORDER-${Date.now()}`;
          const data = {
            transaction_details: {
              order_id: orderId,
              gross_amount: grossAmount
            },
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            }))
          };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/payment-links`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": basicAuth
          },
          body: JSON.stringify(data),
        });
        const paymentLink = await response.json();
        // console.log(paymentLink);
        setPaymentUrl(paymentLink.payment_url);
          }}
        >
          Create Payment Link
        </Button> */}
      </div>
       {/* <Link
      href={paymentUrl}
      target="_blank"
      className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
    >
      {paymentUrl}
    </Link> */}
<Button
  type="button"
  variant="outline"
  className="text-indigo-500 py-4 text-sm m-2 font-medium transition hover:scale-105 border-indigo-500"
onClick={async () => {
    try {
      const response = await fetch('/api/gopay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.qr_url) {
          setPaymentUrl(result.qr_url);
          setExpiryTime(result.expiry_time);
        } else {
          throw new Error("QR code not found in response");
        }
      } else {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}}

>
  Pay with Gopay
</Button>

   {paymentUrl && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">Scan to Pay</p>
          <Image
            src={paymentUrl}
            alt="QRIS GoPay QR Code"
            width={300}
            height={300}
            className="border p-2 bg-white"
          />
          {timeLeft !== null && (
            <div className="text-center">
              <p className="text-sm text-gray-600">QR Code expires in:</p>
              <p className={`text-lg font-bold ${
                timeLeft < 60 ? 'text-red-500' : 'text-gray-800'
              }`}>
                {formatTime(timeLeft)}
              </p>
              {timeLeft <= 0 && (
                <p className="text-red-500 text-sm mt-1">
                  QR Code has expired. Please generate a new one.
                </p>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}