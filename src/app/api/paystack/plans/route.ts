// app/api/paystack/plans/route.ts
import https from "https";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/plan",
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        process.env.MODE === "production"
          ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
          : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT
      }`,
    },
  };

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

    // Handle errors with the request
    paystackReq.on("error", (error: Error) => {
      console.error(error);
      reject(
        NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
      );
    });

    paystackReq.end();
  });
}
