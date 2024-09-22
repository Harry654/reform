import { db } from "@/lib/firebase/config"; // Adjust the path to your config file
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const secret =
  (process.env.MODE === "production"
    ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
    : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT) || "";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-paystack-signature");

  // Get the readable stream from the request
  const rawBody = await req.text(); // Converts readable stream to string

  // Parse the string as JSON
  const event = JSON.parse(rawBody);

  //validate event
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(event))
    .digest("hex");

  if (hash !== signature)
    return new NextResponse("Unauthorized", { status: 401 });

  if (!event) return;
  // console.log(event);
  // Handle the event
  switch (event.event) {
    case "charge.success":
      console.log("charge.success was successful!");

      // Reference the user's document in Firestore
      const userDocRef = doc(db, "users", event.data.metadata.userId);

      // Update the user's document with the plan information
      await updateDoc(userDocRef, {
        paystack_id: event.data.customer.customer_code,
        subscriptionPlan: event.data.plan.name,
        subscriptionStartDate: new Date(),
        subscriptionStatus: "active",
        paymentMethod: event.data.authorization.channel,
        lastPaymentDate: new Date(),
      });

      break;
    // ... handle other event types
    default:
    // console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
