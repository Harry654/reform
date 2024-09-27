import { db } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cancelledSubscriptionPlan } from "@/constants/plan_types";
import { initiateRefund } from "@/helpers/paystack/initiateRefund";
import { updateUserAuthorization } from "@/helpers/firebase/updateUserAuthorization";
import { createSubscription } from "@/helpers/paystack/createSubscription";

type TEvent = {
  event: string;
  data: {
    subscription_code: string;
    status: string;
    createdAt: string;
    email_token: string;
    reference: string;
    channel: string;
    plan: {
      plan_code: string;
      name: string;
    };
    authorization: {
      authorization_code: string;
      channel: string;
      reusable: boolean;
    };
    customer: {
      id: string;
      name: string;
      email: string;
      customer_code: string;
      metadata: {
        userId: string;
      };
    };
    metadata: {
      [key: string]: string;
    };
  };
};

const secret =
  (process.env.MODE === "production"
    ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
    : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT) || "";

async function subscriptionDisable(event: TEvent) {
  console.log(`${event.event} was successful!`);

  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the subscription information
  await updateDoc(userDocRef, {
    subscription: cancelledSubscriptionPlan,
  });
}

async function subscriptionNotRenew(event: TEvent) {
  console.log(`${event.event} was successful!`);

  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the subscription information
  await updateDoc(userDocRef, {
    "subscription.status": event.data.status, // status of the subscription
  });
}

async function subscriptionCreate(event: TEvent) {
  console.log(`${event.event} was successful!`);

  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the subscription information
  await updateDoc(userDocRef, {
    subscription: {
      code: event.data.subscription_code, // code for the subscription plan
      token: event.data.email_token, // code for the subscription plan
      status: event.data.status, // status of the subscription
      startDate: event.data.createdAt, // Start date of the subscription
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

  if (event.data.metadata.reason === "card_authorization_charge") {
    console.log(event.data.metadata.reason);
    if (!event.data.authorization.reusable) return;
    console.log(event.data.metadata.reason);

    await updateUserAuthorization(
      event.data.customer.metadata.userId,
      event.data.authorization.authorization_code
    );
    await initiateRefund(event.data.reference);

    await createSubscription(
      event.data.customer.metadata.userId,
      event.data.customer.customer_code,
      event.data.metadata.plan_code,
      event.data.authorization.authorization_code,
      event.data.metadata.start_date
    );
    return;
  }
  // Reference the user's document in Firestore
  const userDocRef = doc(db, "users", event.data.customer.metadata.userId);

  // Update the user's document with the plan information
  await updateDoc(userDocRef, {
    "subscription.status": "active", // Update the status only
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
      subscriptionDisable(event);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
