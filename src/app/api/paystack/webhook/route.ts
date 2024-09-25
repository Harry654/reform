import { db } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { freeSubscriptionPlan } from "@/constants/free_plan";

type TEvent = { [key: string]: any };

const secret =
  (process.env.MODE === "production"
    ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
    : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT) || "";

async function subscriptionDisabled(event: TEvent) {
  console.log(`${event.event} was successful!`);

  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the subscription information
  await updateDoc(userDocRef, {
    subscription: { ...freeSubscriptionPlan, subscriptionStatus: "cancelled" },
  });
}

async function subscriptionNotRenew(event: TEvent) {
  console.log(`${event.event} was successful!`);

  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the subscription information
  await updateDoc(userDocRef, {
    "subscription.subscriptionStatus": event.data.status, // status of the subscription
  });
}

async function subscriptionCreate(event: TEvent) {
  console.log(`${event.event} was successful!`);

  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the subscription information
  await updateDoc(userDocRef, {
    subscription: {
      subscriptionCode: event.data.subscription_code, // code for the subscription plan
      subscriptionStatus: event.data.status, // status of the subscription
      subscriptionStartDate: event.data.createdAt, // Start date of the subscription
      paymentMethod: "card", // Payment method used
      plan: {
        code: event.data.plan.plan_code,
        name: event.data.plan.name,
      },
    },
  });
}

async function chargeSuccess(event: TEvent) {
  console.log(`${event.event} was successful!`);

  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the plan information
  await updateDoc(userDocRef, {
    "subscription.subscriptionStatus": "active", // Update the status only
    "subscription.paymentMethod": event.data.channel, // Update the payment method only
  });
}

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
  console.log(event);
  // Handle the event
  switch (event.event) {
    case "charge.success":
      chargeSuccess(event);
      break;
    case "subscription.create":
      subscriptionCreate(event);
      break;
    case "subscription.not_renew":
      subscriptionNotRenew(event);
      break;
    case "subscription.disable":
      subscriptionDisabled(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
