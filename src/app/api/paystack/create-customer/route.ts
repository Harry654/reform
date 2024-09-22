import { NextResponse } from "next/server";
import https from "https";

export async function POST(req: Request): Promise<NextResponse> {
  const { email, first_name, last_name } = await req.json();

  const params = JSON.stringify({
    email,
    first_name,
    last_name,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/customer",
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        process.env.MODE === "production"
          ? process.env.PAYSTACK_SECRET_KEY_PRODUCTION
          : process.env.PAYSTACK_SECRET_KEY_DEVELOPMENT
      }`, // Use your secret key stored in environment variables
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
