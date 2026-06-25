import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Type definitions for the expected Paystack webhook payload
interface PaystackEvent {
  event: string;
  data: {
    reference: string;
    status: string;
    amount: number;
    customer: {
      email: string;
    };
    metadata?: any;
    [key: string]: any; // Allow other properties
  };
}

async function notifyEngineeringTeam(orderData: any) {
  console.log("--- [WhatsApp Notification Stub] ---");
  console.log(`Simulating message to Admin Phone Number (via Twilio/WhatsApp Business API)`);
  console.log(`Order ID: ${orderData.orderId}`);
  console.log(`Bike: ${orderData.make} ${orderData.model}`);
  console.log(`Part: ${orderData.part}`);
  console.log(`Amount: $${orderData.amount}`);
  console.log(`STL File: ${orderData.fileUrl}`);
  console.log("------------------------------------");
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
}

async function scheduleKwikDispatch(orderData: any) {
  console.log("--- [Kwik Delivery Dispatch Stub] ---");
  console.log("Simulating POST request to: https://app.kwik.delivery/api/v1/scheduleDeliveryTask");
  
  const payload = {
    pickup_address: "3D Printing Workshop HQ, Lagos",
    delivery_address: orderData.deliveryAddress || "Customer Address Placeholder",
    vehicle_type: "delivery_bike"
  };
  
  console.log("Kwik Payload:", payload);
  console.log("-------------------------------------");
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
}

export async function POST(req: NextRequest) {
  try {
    // 1. Read the raw text body first (CRITICAL for signature verification)
    const rawBody = await req.text();
    
    // 2. Extract the signature header
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature header" }, { status: 401 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error("PAYSTACK_SECRET_KEY is not defined in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 3. Verify signature using HMAC SHA512
    const expectedSignature = crypto
      .createHmac("sha512", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 4. Parse the verified payload
    const payload = JSON.parse(rawBody) as PaystackEvent;

    // 5. Route specifically for 'charge.success'
    if (payload.event === "charge.success") {
      const { reference } = payload.data;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
      
      if (!supabaseUrl || !supabaseServiceKey) {
        console.error("Supabase credentials missing for webhook processing");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
      }

      // Initialize Supabase with the Service Role Key to bypass RLS securely
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Mutate the orders table
      const { error: dbError } = await supabase
        .from("orders")
        .update({ payment_status: "success" })
        .eq("paystack_reference", reference);

      if (dbError) {
        console.error(`Database update failed for order ${reference}:`, dbError);
        // Note: Still returning 200 below so Paystack doesn't retry unnecessarily,
        // but we log the error for internal alerting.
      } else {
        console.log(`Successfully updated order reference: ${reference}`);

        // =========================================================================
        // [FULFILLMENT BLOCK]
        // =========================================================================
        try {
          // In production, we'd query the exact order details using Supabase here.
          // For now, we simulate the structured data to pass to the APIs.
          const simulatedOrderData = {
            orderId: reference,
            make: "Yamaha",
            model: "YZF-R1",
            part: "Aerodynamic Winglet",
            amount: payload.data.amount / 100, // Paystack amounts are typically in minor currency
            fileUrl: "https://placeholder-project.supabase.co/storage/v1/object/public/models/winglet.stl",
            deliveryAddress: payload.data.metadata?.address || "123 Fairing Avenue, Lagos, Nigeria"
          };

          // Trigger automated dispatch and notifications
          await Promise.all([
            notifyEngineeringTeam(simulatedOrderData),
            scheduleKwikDispatch(simulatedOrderData)
          ]);
        } catch (fulfillmentError) {
          // Error Isolation: If Kwik's API or WhatsApp fails, we catch it here.
          // This ensures the webhook still returns a 200 OK so Paystack doesn't retry infinitely.
          console.error(`Fulfillment automated dispatch failed for order ${reference}:`, fulfillmentError);
        }
      }
    }

    // 6. Always return 200 OK immediately to acknowledge receipt
    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });

  } catch (error) {
    // Catch-all error handler ensuring no stack traces leak
    console.error("Webhook route encountered an error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 400 });
  }
}
