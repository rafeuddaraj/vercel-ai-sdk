**Vercel AI SDK হলো এমন একটি টুল যা ওয়েব ডেভেলপারদের জন্য AI ব্যবহার করাকে সহজ, practical এবং production-ready করে দেয়**।

যখন OpenAI, Anthropic, Google এর মতো কোম্পানিগুলো তাদের AI model গুলো API হিসেবে উন্মুক্ত করলো, তখন AI হঠাৎ করেই সবার হাতের কাছে চলে আসে। কিন্তু বাস্তবে সেই API গুলো ব্যবহার করে একটি ভালো AI-powered ওয়েব অ্যাপ বানানো মোটেও সহজ ছিল না।

আপনি যদি সরাসরি OpenAI এর API ব্যবহার করতে যান, তাহলে আপনাকে নিজে নিজে অনেক বিষয় handle করতে হয়।
request–response format, streaming response manage করা, ধাপে ধাপে UI তে text দেখানো, error handling, rate limit, এমনকি model change হলে কোড update করা—এই সবকিছুই আলাদা করে ভাবতে হয়।

এই সমস্যাগুলোর একটা বড় বিষয় হলো, **এগুলো প্রায় সব AI-powered অ্যাপেই একই রকম**। তবুও প্রতিবার ডেভেলপারদের নতুন করে এগুলো solve করতে হচ্ছিল।

এই জায়গা থেকেই Vercel একটি গুরুত্বপূর্ণ বিষয় বুঝতে পারে।

যেভাবে React UI বানানোর common সমস্যাগুলো solve করে দেয়, ঠিক সেভাবেই AI integration এর common সমস্যাগুলোও abstract করা দরকার। ডেভেলপারদের যেন low-level AI API নিয়ে যুদ্ধ করতে না হয়।

এই চিন্তা থেকেই **Vercel AI SDK** এর জন্ম।

Vercel AI SDK মূলত একটি unified layer তৈরি করে, যেটা বিভিন্ন AI provider এর উপর বসে কাজ করে। আজ আপনি OpenAI ব্যবহার করছেন, ভবিষ্যতে চাইলে অন্য কোনো provider ব্যবহার করতে পারবেন, কিন্তু আপনার অ্যাপের মূল লজিক খুব একটা বদলাতে হবে না।

আরেকটি বড় কারণ ছিল **streaming experience**।

ChatGPT এর মতো অ্যাপে আপনি দেখেছেন, লেখা একসাথে আসে না, ধীরে ধীরে আসে। এই experience ইউজারের কাছে অনেক বেশি natural লাগে, কিন্তু এটাকে ঠিকভাবে implement করা backend এবং frontend—দুই দিক থেকেই বেশ জটিল।

Vercel AI SDK শুরু থেকেই streaming-কে first-class citizen হিসেবে ডিজাইন করেছে। অর্থাৎ streaming কোনো optional feature না, বরং SDK এর core অংশ।

শুধু backend নয়, frontend এর কথাও এখানে গুরুত্ব দেওয়া হয়েছে। React এর জন্য আলাদা কিছু hook দেওয়া আছে, যেগুলো ব্যবহার করে খুব অল্প কোডেই chat interface বা streaming UI তৈরি করা যায়। যেসব কাজ আগে করতে গেলে অনেক boilerplate লাগতো, সেগুলো এখন অনেক সহজ।

আরেকটি গুরুত্বপূর্ণ বিষয় হলো modern web architecture।

Vercel নিজেই Next.js তৈরি করে। তারা খুব ভালোভাবে জানে server, serverless, edge, streaming, React Server Components এগুলো বাস্তবে কীভাবে কাজ করে। AI SDK এই পুরো ecosystem মাথায় রেখে তৈরি করা।

সহজভাবে বললে—

* OpenAI এর API হলো raw engine
* Vercel AI SDK হলো সেই engine ব্যবহার করার জন্য প্রয়োজনীয় steering wheel, brake আর dashboard

এই কারণেই Vercel AI SDK এসেছে।
যাতে AI ওয়েব ডেভেলপারদের জন্য ভয়ের বিষয় না হয়ে, একটি normal tool হয়ে যায়—ঠিক যেমন database, authentication বা API call।

এই কোর্সে আপনি শুধু AI SDK এর API শিখবেন না।
আপনি শিখবেন **AI-powered অ্যাপ কীভাবে ভাবতে হয়**, আর Vercel AI SDK সেই চিন্তাকে বাস্তবে রূপ দেওয়ার কাজটা সহজ করে দেয়।

AI SDK মূলত তিনটি অংশে ভাগ করা।

প্রথম অংশটি হলো **Core**। এখানে আপনি text generate করতে পারবেন, streaming response ব্যবহার করতে পারবেন, এমনকি structured output (যেমন JSON) নিয়েও কাজ করতে পারবেন।

দ্বিতীয় অংশটি হলো **UI**। এখানে React এর জন্য কিছু বিশেষ hook দেওয়া আছে, যেগুলো ব্যবহার করে খুব সহজেই chat interface বা streaming UI তৈরি করা যায়।

তৃতীয় অংশটি হলো **React Server Components** এর জন্য। এটি এখনো experimental পর্যায়ে আছে, তাই এই কোর্সে আমরা এই অংশটি ব্যবহার করবো না।

এই কোর্সটি মূলত তাদের জন্য, যারা **Next.js জানেন**, কিন্তু AI নিয়ে কাজ শুরু করবেন কীভাবে, সেটি এখনো পরিষ্কার না। আপনি যদি JavaScript এর বেসিক জানেন, React এর fundamentals বুঝেন, আর Next.js এর App Router সম্পর্কে ধারণা থাকে, তাহলে এই কোর্সটি আপনি নিশ্চিন্তে করতে পারবেন। TypeScript জানা থাকলে ভালো, তবে না জানলেও কোনো সমস্যা নেই। কোর্স চলাকালেই প্রয়োজনীয় অংশগুলো পরিষ্কার হয়ে যাবে।

---

এখন আমরা nextjs প্রজেক্ট তৈরি করবো, npx create-next-app@latest
(src) folder enable করবো।

আমরা এখানে TypeScript কে ignore করছি আমরা js প্রজেক্ট ই setup করছি tailwindCSS দিয়ে ঠিক আছে।

প্রজেক্ট তৈরি হয়ে গেলে পরবর্তী ধাপ হলো প্রয়োজনীয় dependency install করা। আমরা AI SDK এর core package install করবো, OpenAI provider install করবো, এবং React এর জন্য AI SDK এর আলাদা package ব্যবহার করবো। পাশাপাশি আমরা **Zod** install করে নিচ্ছি, যাতে পরে লেসনগুলোতে type-safe validation এর কাজে লাগবে।

install cmd = `pnpm add ai @ai-sdk/react zod`

আমরা এখন openai এর জন্য একটি API key জেনারেট করবো। "https://openai.com/api"

AI model ব্যবহার করা পুরোপুরি ফ্রি নয়, এটা মাথায় রাখতে হবে। আপনাকে OpenAI তে একটি account তৈরি করতে হবে, billing add করতে হবে, এবং তারপর একটি secret API key generate করতে হবে। এই API key মূলত আপনার অ্যাপের পক্ষ থেকে AI ব্যবহার করার অনুমতি দেয়।

এই key কখনোই সরাসরি কোডের ভেতরে লেখা যাবে না। আমরা `.env.local` ফাইল ব্যবহার করে API key সংরক্ষণ করবো। Next.js নিজে থেকেই এই ফাইলটিকে GitHub থেকে exclude করে রাখে, ফলে আপনার key নিরাপদ থাকে।

```env
OPENAI_API_KEY="your-api-key"
```

এখন nextjs run করে দেখবো সব ঠিক আছে নাকি।


---

আমরা এখন মূলত ai দিয়ে টেক্স জেনারেট করবো, তার জন্য, আমরা next.js এর route handler ব্যবহার করবো।

src ফোল্ডার এর app ফোল্ডারের মধ্যে api ফোল্ডার বানাবো, এবং সেখানে একটি route handler বানাচ্ছি completion নামে।

`/src/app/api/completion/route.js
 ```js
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
 ```

আমরা এখানে OpenAI এর gpt-4.1-nano model ব্যবহার করছি এবং generateText ফাংশনের মাধ্যমে prompt এর উপর ভিত্তি করে text generate করছি।

gpt-4.1-nano হলো একটি lightweight model, যা দ্রুত response দেয় এবং token cost তুলনামূলকভাবে কম। এই মডেলটি simple text generation, experimentation এবং ছোট প্রজেক্টের জন্য বেশ উপযোগী।

যেহেতু এটি একটি crash course এবং আমরা মূলত AI SDK-এর workflow বোঝাতে চাই, তাই development এবং learning-এর জন্য এই মডেলটি একটি practical choice।


এখন আমাদের ui বানাতে হবে।

 তো আমরা, app ফোল্ডারের মধ্যে নতুন ফোল্ডার বানাই ui যেখানে আমাদের সকল ui এর কাজ গুলো করবো। মানে আমাদের ui রাউট বানাই।

 সেখানে লিখিঃ
 `/src/app/ui/completion.jsx`

```jsx
"use client";

import { useState } from "react";

export default function CompletionPage() {
  const [prompt, setPrompt] = useState(""); // user input
  const [completion, setCompletion] = useState(""); // AI response
  const [isLoading, setIsLoading] = useState(false); // loading flag
  const [error, setError] = useState(null); // error message

  const complete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt("");
    setError(null);

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setCompletion(data.text);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : completion ? (
        <div className="whitespace-pre-wrap">{completion}</div>
      ) : null}
      <form
        onSubmit={complete}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How can I help you?"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
```

এখন প্রম্পট লিখিঃ
-> What is LLM?
-> What is Ai

---

তো এখন পর্যন্ত আমরা AI দিয়ে মূলত text generate করতে পারছি।

কিন্তু এখানে একটা বিষয় খেয়াল করলে দেখা যাবে, এই responseটা পুরোপুরি তৈরি হওয়ার পরেই আমাদের UI তে দেখাচ্ছে। অর্থাৎ AI আগে সম্পূর্ণ উত্তর বানাচ্ছে, তারপর একবারে সেটাকে আমরা screen-এ render করছি।

অথচ ChatGPT বা Gemini যেভাবে কাজ করে, সেটা আলাদা। তারা streaming response ব্যবহার করে। মানে পুরো উত্তর তৈরি শেষ হওয়ার জন্য অপেক্ষা না করে, লেখা তৈরি হওয়ার সাথে সাথেই একটু একটু করে UI তে দেখাতে থাকে।

এই কারণেই তাদের response অনেক বেশি live এবং interactive মনে হয়।

তো আমরা এখন এই streaming ই করতে যাচ্ছি এখনঃ

`/src/app/api/stream.js`:

```js
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
```

এখন ui বানাইঃ

`/src/app/ui/stream.jsx`

```js
"use client";

import { useCompletion } from "@ai-sdk/react";

export default function CompletionStreamPage() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setInput,
  } = useCompletion({
    api: "/api/stream",
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error.message}</div>}
      {isLoading && !completion && <div>Loading...</div>}

      {completion && <div className="whitespace-pre-wrap">{completion}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput(""); // temporary fix to clear the input after submission
          handleSubmit(e);
        }}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            value={input}
            onChange={handleInputChange}
            placeholder="How can I help you?"
          />
          {isLoading ? (
            <button
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
```

আবার প্রম্পট লিখছিঃ
-> What is LLM
-> What is Ai