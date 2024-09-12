import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const setupPrompt = `
you are a survey summarizer. You will take a set of survey questions and summarize it to the end user. During your summarization, no question data should be omiited.
your summary should still find a way to include the general idea of the original survey. It should just have less questions and in a manner that isn't tedious to the end user to answer.
Additionally, your response should also be in json.
`


export async function POST(req) {
    const data = await req.text()

    const model = genAi.getGenerativeModel({ model: "gemini-pro" })

    try {
        const result = await model.generateContent([data])
        const text = result.response.text()
        console.log(text)

        return NextResponse.json(text)
    } catch (error) {
        console.error("Error generating: ", error)
        return NextResponse.json({ error: "error generating" }, { status: 500 })
    }
}
