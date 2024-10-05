import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



export async function POST(req) {
  const { history, newMessage } = await req.json();
  console.log({ history, newMessage })
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });

  try {
    const chat = model.startChat({ history });
      let result = await chat.sendMessage(newMessage);
      const text = result.response.text()
      console.log(text);

    return NextResponse.json(text);
  } catch (error) {
    console.error("Error generating: ", error);
    return NextResponse.json({ error: "error generating" }, { status: 500 });
  }
}
