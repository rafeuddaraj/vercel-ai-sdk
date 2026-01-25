import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";

export const POST = async (req) => {
    const { text } = await req.json();
    try {
        const result = await generateText({
            model: openai("gpt-4.1-nano"),
            output: Output.choice({ options: ["Positive", "Negative", "Neutral"] }),
            prompt: `Classify the sentiment in this text ${text}`
        })
        return Response.json({ result: result.output })
    } catch (err) {
        console.error("Streaming error", err)
        return new Response.json("Error", { status: 500 })
    }
}