import { NextResponse } from "next/server";
import https from "https";

const secret =
  process.env.MODE === "production"
    ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
    : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT;

export async function POST(req: Request): Promise<NextResponse> {
  const { code } = await req.json();

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: `/subscription/${code}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const request = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk: string) => {
        data += chunk;
      });

      res.on("end", () => {
        const jsonResponse = JSON.parse(data);
        resolve(NextResponse.json(jsonResponse));
      });
    });

    request.on("error", (error) => {
      reject(NextResponse.json({ error: error.message }));
    });

    request.end();
  });
}