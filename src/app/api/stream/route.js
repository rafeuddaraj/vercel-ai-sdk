import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const POST = async (req) => {
    const body = await req.json();
    console.log(body);

    const { prompt } = body
    try {
        const result = streamText({
            model: openai("gpt-4.1-nano"),
            prompt
        })
        return result.toUIMessageStreamResponse();
    } catch (err) {
        console.log("streamming error", err);
        return new Response({ error: err.messsage }, { status: 500 })
    }
}