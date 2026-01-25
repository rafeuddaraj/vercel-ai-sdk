import { openai } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { pokenmonSchema } from "./schema";

export const POST = async (req) => {
    try {
        const { type } = await req.json();
        console.log(type);

        const result = streamText({
            model: openai("gpt-4.1-nano"),
            output: Output.array({
                element: pokenmonSchema
            }),
            prompt: `Generate a list of 5 ${type} type pokemon`
        })
        return result.toTextStreamResponse()
    } catch (err) {
        console.log("Streaming error", err);
        return new Response("Error", { status: 500 })
    }
}