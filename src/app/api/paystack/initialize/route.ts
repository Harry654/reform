// app/api/paystack/initialize/route.ts

import https from "https";
import { NextRequest, NextResponse } from "next/server";

const secret =
  (process.env.MODE === "production"
    ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
    : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT) || "";
interface PaystackRequestBody {
  uid: string;
  email: string;
  amount: string;
  plan_code: string;
  start_date: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, amount, plan_code, start_date }: PaystackRequestBody =
      await req.json();
    // Prepare Paystack parameters
    const params = JSON.stringify({
      email,
      amount,
      channels: ["card"],
      metadata: { reason: "card_authorization_charge", plan_code, start_date },
    });

    console.log(JSON.stringify(params));

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
    };

    // Return a promise that sends the HTTPS request
    return new Promise((resolve, reject) => {
      const paystackReq = https.request(options, (paystackRes) => {
        let data = "";

        // Collect response data
        paystackRes.on("data", (chunk: Buffer) => {
          data += chunk.toString();
        });

        // End of the response
        paystackRes.on("end", () => {
          const parsedData = JSON.parse(data);

          if (paystackRes.statusCode === 200) {
            resolve(NextResponse.json(parsedData, { status: 200 }));
          } else {
            resolve(
              NextResponse.json(parsedData, { status: paystackRes.statusCode })
            );
          }
        });
      });

      // Handle any errors with the request
      paystackReq.on("error", (error: Error) => {
        console.error(error);
        reject(
          NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
        );
      });

      // Write the request body and end the request
      paystackReq.write(params);
      paystackReq.end();
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to initialize transaction" },
      { status: 500 }
    );
  }
}
