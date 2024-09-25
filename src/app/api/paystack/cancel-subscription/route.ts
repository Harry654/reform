import { NextResponse } from "next/server";
import https from "https";

const secret =
  process.env.MODE === "production"
    ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
    : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT;

export async function POST(req: Request): Promise<NextResponse> {
  const { code, token } = await req.json();

  const params = JSON.stringify({
    code,
    token,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/subscription/disable",
    method: "POST",
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

    request.write(params);
    request.end();
  });
}
