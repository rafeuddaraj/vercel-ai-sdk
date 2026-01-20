আপনি এখন পর্যন্ত অনেক গুরুত্বপূর্ণ কাজ করে ফেলেছেন। আগের লেসনে আমরা প্রজেক্ট সেটআপ করেছি, AI SDK ইনস্টল করেছি, OpenAI API key সেট করেছি এবং নিশ্চিত হয়েছি যে আমাদের Next.js অ্যাপ ঠিকভাবে রান করছে। এখন এই লেসনে আমরা প্রথমবারের মতো বাস্তবভাবে AI ব্যবহার করব। এই লেসনের শেষে আপনার নিজের বানানো একটি AI-powered feature থাকবে, যেটা ইউজারের প্রশ্ন নিয়ে OpenAI থেকে উত্তর জেনারেট করে দেখাতে পারবে। শুনতে বড় কিছু মনে হলেও, বিশ্বাস করুন, কাজটা খুবই সহজ।

এই লেসনে আমরা মূলত দুইটা জিনিস বানাবো। প্রথমত, একটি API route যেটা OpenAI এর সাথে কথা বলবে। দ্বিতীয়ত, একটি UI যেটা ইউজারের কাছ থেকে ইনপুট নেবে এবং AI এর দেওয়া উত্তর স্ক্রিনে দেখাবে। ধাপে ধাপে গেলে সবকিছু খুব পরিষ্কার হয়ে যাবে।

চলুন প্রথমে API route দিয়ে শুরু করি। Next.js এর app router ব্যবহার করলে API বানানো খুবই সুন্দরভাবে করা যায়। app ফোল্ডারের ভেতরে আমরা একটি নতুন ফোল্ডার তৈরি করবো, যার নাম হবে api। এই api ফোল্ডারের ভেতরে আমরা আরেকটি ফোল্ডার বানাবো completion নামে। এই নামটাই পরে আমাদের API endpoint এর অংশ হবে। এরপর completion ফোল্ডারের ভেতরে আমরা route.ts নামে একটি ফাইল তৈরি করবো।

এই route.ts ফাইলটাই আমাদের AI-powered backend। এখানে আমরা একটি async POST handler লিখবো। Next.js এ নিয়ম হচ্ছে, function এর নাম অবশ্যই post হতে হবে, কারণ এটাই বলে দেয় কোন HTTP method এ এই route কাজ করবে।

ফাইলের একদম উপরে আমরা প্রয়োজনীয় জিনিসগুলো import করবো। আমরা AI SDK core প্যাকেজ থেকে generateText নামের একটি function আনবো, আর AI SDK OpenAI প্যাকেজ থেকে OpenAI provider আনবো। এই দুইটা একসাথে কাজ করে OpenAI মডেল ব্যবহার করে আমাদের জন্য টেক্সট জেনারেট করবে।

এরপর post function এর ভেতরে আমরা প্রথমবারের মতো AI call করবো। generateText function এ আমরা একটি object পাঠাই। এই object এর ভেতরে সবচেয়ে গুরুত্বপূর্ণ দুইটা জিনিস হলো model আর prompt। model দিয়ে আমরা বলে দিই কোন AI model ব্যবহার করতে চাই। এখানে আমরা OpenAI এর GPT-4.1 Nano ব্যবহার করবো। এই model খুব fast, খরচ কম, আর শেখার জন্য একদম পারফেক্ট।

prompt হচ্ছে সেই instruction যেটা আমরা AI কে দিই। এই মুহূর্তে শেখার সুবিধার জন্য আমরা prompt টা hardcode করবো। ধরুন আমরা লিখলাম, “Explain what an LLM is in simple terms।” generateText function একটা promise রিটার্ন করে, যেটার ভেতরে text নামে একটি property থাকে। আমরা await করে সেই text বের করে নেবো।

সবশেষে আমরা সেই text টাকে JSON আকারে response হিসেবে রিটার্ন করবো। এই পর্যন্তই। এতটুকু কোড লিখেই আমরা OpenAI এর সাথে কথা বলার মতো একটি API route বানিয়ে ফেলেছি। সত্যি বলতে, ১০–১২ লাইনের কোডে AI ব্যবহার করা কয়েক বছর আগেও কল্পনা করা যেত না।

এখন চলুন এই API টা টেস্ট করি। VS Code এ Thunder Client বা যেকোনো API testing tool ব্যবহার করে আমরা একটি POST request পাঠাবো। URL হবে localhost:3000/api/completion। কয়েক সেকেন্ড অপেক্ষা করার পর আপনি দেখবেন একটি JSON response এসেছে, যার ভেতরে AI এর লেখা উত্তর আছে। এর মানে আমাদের route ঠিকঠাক কাজ করছে।

এখন যেহেতু backend তৈরি হয়ে গেছে, এবার আমরা frontend বানাবো। ইউজার যেন নিজের প্রশ্ন লিখতে পারে এবং AI এর উত্তর দেখতে পারে, সেটার জন্য একটি UI দরকার।

app ফোল্ডারের ভেতরে আমরা একটি নতুন ফোল্ডার বানাবো ui নামে। এর ভেতরে আবার completion নামে আরেকটি ফোল্ডার বানাবো। এই ফোল্ডারের ভেতরে page.tsx নামে একটি ফাইল তৈরি করবো। Next.js এ UI route এর জন্য ফাইলের নাম অবশ্যই page.tsx হতে হয়।

এই component টা হবে client component, কারণ এখানে আমরা React state ব্যবহার করবো। তাই ফাইলের একদম উপরে “use client” লিখবো।

প্রথমে আমরা শুধু basic JSX structure বানাবো। একটি container div থাকবে। উপরে থাকবে AI এর response দেখানোর জায়গা, আর নিচে থাকবে একটি form। form এর ভেতরে একটি input field থাকবে, যেখানে ইউজার প্রশ্ন লিখবে, আর একটি send button থাকবে।

এই স্টেজে চাইলে আপনি Tailwind দিয়ে স্টাইল করতে পারেন। তবে স্টাইলিং এই কোর্সের মূল ফোকাস না, তাই আপনি চাইলে GitHub থেকে স্টাইল কপি করতে পারেন বা একদম simple রেখেও এগোতে পারেন।

এখন আমরা input টাকে interactive করবো। React এর useState hook ব্যবহার করে আমরা prompt নামে একটি state বানাবো। এই state ইউজারের লেখা ইনপুট ধরে রাখবে। input field এর value আমরা prompt এর সাথে bind করবো এবং onChange এ setPrompt ব্যবহার করবো।

এরপর আমরা আরেকটি state বানাবো completion নামে। এখানে AI এর response রাখা হবে। পাশাপাশি একটি loading state রাখবো, যাতে আমরা বুঝতে পারি request চলছে কিনা।

এখন আসল কাজ, অর্থাৎ API call করা। আমরা একটি async function লিখবো, যেটা form submit হলে কল হবে। প্রথমে আমরা event.preventDefault করবো, যেন page reload না হয়। তারপর loading true করে দেবো। এরপর fetch ব্যবহার করে আমাদের /api/completion endpoint এ POST request পাঠাবো। request body তে আমরা prompt পাঠাবো JSON আকারে।

response আসার পর আমরা সেটাকে JSON এ convert করবো এবং data.text থেকে AI এর উত্তর বের করে completion state এ সেট করবো। সবশেষে loading false করে দেবো।

JSX এ আমরা conditionally render করবো। যদি loading true হয়, তাহলে “Loading…” দেখাবো। যদি loading false হয় এবং completion থাকে, তাহলে AI এর উত্তর দেখাবো। আর button টা loading অবস্থায় disable করে দেবো, যেন বারবার submit না হয়।

এখন আরেকটি গুরুত্বপূর্ণ জিনিস যোগ করবো, সেটা হলো error handling। আমরা error নামে একটি state বানাবো। যদি API থেকে error আসে বা fetch fail করে, তাহলে সেই error message আমরা UI তে দেখাবো। এতে অ্যাপ অনেক বেশি professional লাগে।

এখন আবার route.ts ফাইলে ফিরে যাই। আমরা এখন পর্যন্ত prompt hardcode করে রেখেছিলাম। কিন্তু বাস্তবে তো ইউজারের লেখা prompt ব্যবহার করতে চাই। তাই post function এ আমরা request parameter নেবো। request.json() await করে prompt বের করবো। এরপর generateText এ hardcoded prompt এর জায়গায় ইউজারের prompt পাঠাবো। পুরো কোডটা আমরা try-catch এর ভেতরে রাখবো, যেন কোনো সমস্যা হলে সুন্দরভাবে error handle করা যায়।

সবকিছু শেষ হলে dev server রান করে ব্রাউজারে যান। completion page খুলুন। এখন কোনো প্রশ্ন লিখে submit করুন। আপনি দেখবেন, প্রথমে loading দেখাচ্ছে, তারপর AI এর লেখা উত্তর চলে আসছে। ইচ্ছা করে model name ভুল লিখে দেখুন। তখন error message আসবে। মানে error handling ও ঠিকভাবে কাজ করছে।

এই লেসনে আপনি যা শিখলেন, সেটা খুবই গুরুত্বপূর্ণ। আপনি শিখেছেন কীভাবে একটি AI-powered API route বানাতে হয়, কীভাবে UI থেকে prompt পাঠাতে হয়, কীভাবে response handle করতে হয়, আর কীভাবে error এবং loading state manage করতে হয়। এই text completion pattern দিয়েই আপনি Q&A feature, content generator, summarizer, এমনকি chat system এর foundation তৈরি করতে পারেন।

একটা কথা মনে রাখবেন। প্রতিটি API call এর একটা খরচ আছে। তাই শেখার সময় simple prompt ব্যবহার করুন এবং OpenAI dashboard এ usage নজরে রাখুন।

এই লেসনের মাধ্যমে আপনার প্রথম AI feature তৈরি হয়ে গেল। পরের লেসনে আমরা এটাকে আরও উন্নত করবো এবং শিখবো কীভাবে streaming response ব্যবহার করে real-time এ AI এর লেখা দেখানো যায়।
