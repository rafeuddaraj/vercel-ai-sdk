import { openai } from "@ai-sdk/openai";
import { generateImage } from "ai";

export const POST = async (req) => {
    const { prompt } = await req.json();
    try {
        const { image } = await generateImage({
            model: openai.imageModel("dall-e-3"), prompt, aspectRatio: "16:9", providerOptions: {
                openai: {
                    style: "vivid",
                    quality: "hd"
                }
            }
        })
        return Response.json(image.base64)
    } catch (err) {
        return Response.json({ err: err.message });
    }
}