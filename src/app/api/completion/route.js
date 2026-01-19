import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
export const POST = async (req) => {
    try {
        const { prompt } = await req.json();
        const resp = await generateText({
            model: openai("gpt-4.1-nano"),
            prompt
        })
        return Response.json({ text: resp.text });
    }
    catch (err) {
        console.log(err.message);
        return Response.json({ err })
    }
}