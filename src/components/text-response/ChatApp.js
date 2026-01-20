"use client"
import { useRef, useState } from "react";

export default function ChatApp() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    async function sendMessage() {
        setIsLoading(true);
        if (!input.trim()) return;

        const userMessage = {
            id: crypto.randomUUID(),
            role: "user",
            text: input.trim(),
        };

        let replyMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            text: ""
        };

        try {
            const resp = await fetch("/api/completion", {
                method: "POST",
                body: JSON.stringify({ prompt: input })
            })
            if (!resp.ok) {
                throw Error("There was an error!")
            }
            const data = await resp.json()
            replyMessage.text = data.text

        } catch (error) {
            console.log(error);
            replyMessage.text = error instanceof Error ? error.message : "There was an error"
        }

        setMessages((prev) => [...prev, userMessage, replyMessage]);
        setInput("");
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setIsLoading(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
            {/* Header */}
            <div className="border-b border-white/10 px-4 py-3 text-sm font-medium">
                Chat UI
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === "user"
                                ? "bg-white text-zinc-900"
                                : "bg-zinc-900 text-zinc-100 border border-white/10"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
                {isLoading && <p>Loading...</p>}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-4">
                <div className="flex gap-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message..."
                        rows={1}
                        className="flex-1 resize-none rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
