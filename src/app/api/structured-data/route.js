import { openai } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { recipeSchema } from "./schema";

export const POST = async (req) => {
    const { dish } = await req.json();

    if (!dish || typeof dish !== "string") {
        return Response.json({
            error: "I only provide cooking recipes. Please specify a dish."
        });
    }

    const systemPrompt = `
ROLE:
You are a recipe-only AI assistant.

SCOPE:
You can respond ONLY with cooking recipes.

RULES:
- If the input is not a food dish → DO NOT answer.
- Never provide information outside cooking or recipes.
- No explanations, opinions, or extra topics.
- Output MUST follow the provided JSON schema.

REFUSAL:
If rules are violated, respond ONLY with this text:
"I only provide cooking recipes. Please specify a dish."
`;

    try {
        const result = streamText({
            model: openai("gpt-4.1-nano"),
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: dish }
            ],
            temperature: 0.2,
            output: Output.object({
                schema: recipeSchema,
            })
        });

        return result.toTextStreamResponse();
    } catch (err) {
        console.error(err);
        return Response.json({ error: err.message });
    }
};
