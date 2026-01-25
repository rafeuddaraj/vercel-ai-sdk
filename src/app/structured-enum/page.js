"use client";
import { useState } from "react";


export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [error, setError] = useState("")

  const analyzeSentiment = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")
    try {
      const resp = await fetch("/api/structured-enums", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await resp.json();
      setSentiment(data.result);
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
      setError("")
      setText("")
    }
  }
  return (
    <>
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {isLoading ? (
          <div className="text-center">Analyzing sentiment...</div>
        ) : sentiment ? (
          <div className="text-center">
            <div className="text-3xl font-bold">
              {sentiment === "Positive" && "😊 Positive"}
              {sentiment === "Negative" && "😞 Negative"}
              {sentiment === "Neutral" && "😐 Neutral"}
            </div>
          </div>
        ) : null}

        <form
          onSubmit={analyzeSentiment}
          className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
        >
          <div className="flex gap-2">
            <input
              className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to analyze..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !text.trim()}
            >
              Analyze
            </button>
          </div>
        </form>
      </div>
    </>
  );
}