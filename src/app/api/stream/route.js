import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const POST = async (req) => {
    const { prompt } = await req.json();
    try {
        const result = streamText({
            model: openai("gpt-4.1-nano"),
            prompt
        })
        result.usage.then(usage => {
            console.log(usage);
        })

        return result.toUIMessageStreamResponse();
    } catch (err) {
        console.log("streamming error", err);
        return new Response({ error: err.messsage }, { status: 500 })
    }
}