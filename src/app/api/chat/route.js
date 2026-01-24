import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";

export const POST = async (req) => {
    const { messages } = await req.json();
    try {
        const modelMessages = await await convertToModelMessages(messages)
        const result = await streamText({
            model: openai("gpt-4.1-nano"),
            messages: [
                // {
                //     role: "system",
                //     content: "You are a helpful coding asistant. keep responses 3 sentenses and focused an practical examples."
                // },
                // {
                //     role: "system",
                //     content: "You are a friendly expert teacher who explains concepts using simple analogies. Alows related technical to every exprinces."
                // },
                {
                    role:"system",
                    content: "Convert user questions about react into code examples. no explain just only code."
                }, {
                    role: "user",
                    content:"How to toggle a boolean?"
                },{
                    role:"assistant",
                    content: `
                    const [isToggle, setIsToggle] = useState(false);
                    const handleToggle = () => {
                        setIsToggle(!isToggle);
                    }
                    `
                },
                ...modelMessages
            ]
        })
        return result.toUIMessageStreamResponse()
    } catch (err) {
        console.error("Chat Streaming error occured", err);
        return new Response(JSON.stringify({ err: err.message }), { status: 5000 })
    }
}