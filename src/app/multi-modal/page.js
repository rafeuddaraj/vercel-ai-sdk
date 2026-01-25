"use client"

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";
import { useState } from "react";

export default function page() {
    const { messages, sendMessage, error, status, stop } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/multi-modal"
        }),
    })

    const [input, setInput] = useState("");
    const [files, setFiles] = useState(null)


    const handleSubmit = (e) => {
        try {
            sendMessage({ text: input, files })
            console.log(files);

            setInput("");
            setFiles(null);
        }
        catch {
            console.error("There was an error");
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto flex min-h-screen max-w-3xl flex-col">
                {/* Header */}
                <header className="sticky top-0 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
                    <div className="flex items-center gap-3 px-4 py-4">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                            <span className="text-sm font-semibold">AI</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">AI Chat</p>
                            <p className="text-xs text-slate-400">Design only</p>
                        </div>
                    </div>
                </header>

                {/* Messages */}
                <main className="flex-1 space-y-5 px-4 py-6">
                    {messages.map(message => (
                        <>
                            {message.role === "assistant" ? (
                                <div key={message.id} className="flex items-start gap-3">
                                    <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white whitespace-pre-wrap">
                                        <span className="text-xs font-semibold">AI</span>
                                    </div>

                                    <div className="max-w-[92%] rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                                        {message.parts.map((part, i) => (
                                            <p key={`${message.id}-${i}`} className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {part.text}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-end gap-3">
                                    <div className="max-w-[92%] rounded-2xl bg-indigo-500/90 p-4 text-white">
                                        {message.parts.map((part, i) => {
                                            switch (part.type) {
                                                case "text":
                                                    return <p key={`${message.id}-${i}`} className="text-sm leading-relaxed">
                                                        {part.text}
                                                    </p>;
                                                case "file":
                                                    if (part.mediaType.startsWith("image/")) {
                                                        return <Image key={part.url} width={200} height={200}
                                                            alt={part.filename}
                                                            src={part.url} />
                                                    } else if (part.mediaType.startsWith("application/pdf")) {
                                                        return <iframe key={part.url} src={part.url} height={500} width={600}>

                                                        </iframe>
                                                    }
                                                    return null
                                            }
                                        })}
                                    </div>
                                    <div className="h-9 w-9 rounded-2xl bg-slate-800/70" />
                                </div>
                            )}
                        </>
                    ))}

                    {status === "submitted" && <div className="flex items-start gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                            <span className="text-xs font-semibold">AI</span>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-900/30 px-4 py-3">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                            <span className="ml-2 text-xs text-slate-400">typing…</span>
                        </div>
                    </div>}

                </main>

                {/* Composer */}
                <footer className="sticky bottom-0 border-t border-slate-800/70 bg-slate-950/70 backdrop-blur">
                    <div className="px-4 py-4">
                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/30 p-3">
                            <div>
                                <input type="file" onChange={e => setFiles(e.target.files)} />
                            </div>
                            <div className="flex items-end gap-2">
                                {/* Textarea */}
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    rows={1}
                                    placeholder="Write your prompt…"
                                    className="flex-1 resize-none rounded-xl border border-slate-800/70 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                />

                                {/* Send button */}
                                {!(status == "submitted" || status === "streaming") ? (<button className="rounded-xl bg-indigo-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                    onClick={handleSubmit} disabled={status !== "ready"} >
                                    Send
                                </button>) : (<button className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                                    onClick={stop} >
                                    Stop
                                </button>)}
                            </div>

                            <div className="mt-2 flex justify-between text-xs text-slate-500">
                                <span>Enter to send</span>
                                <span>Shift + Enter for newline</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}