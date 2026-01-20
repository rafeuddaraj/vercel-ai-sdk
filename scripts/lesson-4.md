এই লেসনে আমরা এমন একটি জিনিস শিখতে যাচ্ছি যেটা আপনার AI অ্যাপকে হঠাৎ করেই অনেক বেশি professional আর fast feel করাবে। আগের লেসনে আমরা দেখেছি কীভাবে AI থেকে পুরো response আসার পর সেটাকে একবারে দেখানো যায়। কিন্তু বাস্তব সমস্যাটা হলো, বড় prompt দিলে AI অনেক সময় নেয়। ইউজার তখন শুধু একটা loading লেখা দেখে বসে থাকে। পাঁচ সেকেন্ড, দশ সেকেন্ড, কখনো কখনো বিশ সেকেন্ডও। এই experience মোটেও ভালো না।

এখন ভাবুন YouTube এর কথা। ভিডিওটা আগে পুরো ডাউনলোড হলে তারপর চালু হতো, তাহলে কি আমরা এত বছর ধরে YouTube ব্যবহার করতাম? না। আমরা দেখি streaming। ভিডিও ধীরে ধীরে আসছে, কিন্তু আমরা সঙ্গে সঙ্গে দেখতে পাচ্ছি। AI response এর ক্ষেত্রেও একই concept। এই লেসনে আমরা সেটাই শিখব, AI text streaming।

এই streaming মানে হলো, AI যখন লেখা generate করা শুরু করবে, তখন থেকেই ইউজার লেখা দেখতে পাবে। পুরো লেখা শেষ হওয়ার জন্য অপেক্ষা করতে হবে না। এতে অ্যাপ অনেক বেশি responsive লাগে এবং user experience একদম অন্য level এ চলে যায়।

চলুন প্রথমে API দিকটা বানাই। আগের মতোই আমরা app folder এ যাব। তার ভেতরে api নামে একটা folder আছে। এখন সেখানে একটি নতুন folder তৈরি করবেন, নাম হবে **stream**। অর্থাৎ আপনার কাজ হবে, `"app/api/stream"` এই path তৈরি করা। এই stream folder এর ভেতরে একটি file তৈরি করবেন `"route.ts"` নামে।

এখন এই route.ts ফাইলটাই হবে আমাদের streaming API route। আগের লেসনে আমরা generateText ব্যবহার করেছিলাম। এবার আমরা ব্যবহার করব streamText। দুইটার কাজ প্রায় একই, কিন্তু streamText response টাকে টুকরো টুকরো করে পাঠায়।

route.ts ফাইলের ভেতরে প্রথমে একটি async POST handler লিখতে হবে। খুব গুরুত্বপূর্ণ বিষয়, function এর নাম অবশ্যই post হতে হবে। Next.js এই নাম দেখেই বুঝে নেয় কোন HTTP method handle করবে।

এরপর উপরে import করতে হবে। এখানে আপনি core AI package থেকে streamText import করবেন এবং OpenAI provider import করবেন। তারপর post function এর ভেতরে request body থেকে prompt বের করবেন। অর্থাৎ `"await request.json()"` ব্যবহার করে prompt destructure করবেন।

এরপর আসল কাজ। আপনি streamText কল করবেন। এর ভেতরে model হিসেবে ব্যবহার করবেন OpenAI এর GPT-4.1-nano এবং prompt হিসেবে ইউজারের পাঠানো prompt। এখানে একটা জিনিস মনে রাখবেন, streamText কে কখনো await করবেন না। এটা অনেক গুরুত্বপূর্ণ।

সবশেষে আপনি return করবেন `"result.toUIMessageStreamResponse()"`। এই method টা এমন একটি HTTP response বানায় যেটা UI সহজেই stream আকারে consume করতে পারে।

পুরো logic টাকে try-catch এর ভেতরে রাখবেন, যাতে কোনো error হলে proper error response পাঠানো যায়। এখন এই API route তৈরি হয়ে গেছে। এটা আগের completion route এর মতোই, শুধু পার্থক্য হলো streaming।

এখন আসি UI অংশে। app folder এর ভেতরে এবার ui নামে একটি folder এ যাবেন। সেখানে একটি নতুন folder বানাবেন stream নামে। অর্থাৎ `"app/ui/stream"`। এই stream folder এর ভেতরে `"page.tsx"` নামে একটি file তৈরি করবেন।

এই page.tsx হবে আমাদের streaming UI। যেহেতু এখানে React state আর interactivity আছে, তাই একদম উপরে `"use client"` লিখতে হবে। তারপর basic component structure লিখবেন।

UI structure আগের completion page এর মতোই হবে। উপরে একটা container থাকবে যেখানে AI response দেখানো হবে। নিচে থাকবে একটি form। form এর ভেতরে একটি input আর একটি button।

এই UI বানানোর পর এবার magic শুরু হয়। এখানে আমরা AI SDK এর একটি বিশেষ hook ব্যবহার করব, নাম useCompletion। এই hook streaming এর সব ঝামেলা নিজে থেকেই handle করে।

ফাইলের উপরে `"import { useCompletion } from 'ai/react'"` লিখবেন। তারপর component এর ভেতরে এই hook ব্যবহার করবেন। useCompletion এর ভেতরে api path দিতে হবে। এখানে আপনি দেবেন `"api: '/api/stream'"`।

এই hook থেকে অনেক কিছু পাওয়া যায়। input value, input change handler, submit handler, completion text, loading state, error, এমনকি stop function ও।

input element এর value হিসেবে hook থেকে পাওয়া input ব্যবহার করবেন এবং onChange এ handleInputChange দিবেন। form এর onSubmit এ handleSubmit দিবেন।

এখন সবচেয়ে সুন্দর অংশটা হলো completion। hook থেকে পাওয়া completion variable টা সময়ের সাথে সাথে আপডেট হয়। AI যত লেখা পাঠায়, তত লেখা এখানে automatically যোগ হতে থাকে। আপনাকে manually state update করতে হবে না।

loading state দিয়ে আপনি loading লেখা দেখাতে পারেন। যখন loading true এবং completion এখনো শুরু হয়নি, তখন আপনি "Loading..." দেখাতে পারেন। আর যখন লেখা আসতে শুরু করবে, তখন সেটা দেখাবেন।

error handling এর জন্য hook থেকে পাওয়া error object ব্যবহার করবেন। error থাকলে error.message দেখাবেন UI তে।

এখন একটা ছোট সমস্যা আছে। streaming চলাকালীন input field automatically clear হয় না। এর জন্য একটি workaround আছে। hook থেকে setInput destructure করবেন এবং submit করার সময় `"setInput('')"` কল করবেন।

আরেকটা দারুণ feature হলো stop button। streaming যদি অনেক লম্বা হয়, ইউজার চাইলে মাঝপথে থামাতে পারে। useCompletion hook থেকে stop function পাওয়া যায়। loading true হলে send button এর জায়গায় একটি stop button দেখাবেন। button এ onClick হিসেবে `"stop"` ব্যবহার করবেন।

এখন ব্রাউজারে গিয়ে `/ui/stream` route এ যান। কোনো প্রশ্ন লিখুন, যেমন explain machine learning in simple terms। Enter চাপার সাথে সাথে আপনি দেখবেন, প্রথমে loading দেখাচ্ছে, তারপর AI লেখা ধীরে ধীরে আসছে। একদম real time।

এই লেসনে আমরা যা শিখলাম, সেটা খুব গুরুত্বপূর্ণ। আমরা শিখেছি কীভাবে streaming API route বানাতে হয়, কীভাবে streamText ব্যবহার করতে হয়, আর কীভাবে UI তে streaming response দেখাতে হয় খুব অল্প কোডে।

এই approach ব্যবহার করে আপনি chat app, AI assistant, live answer system, অনেক কিছু বানাতে পারবেন। সবথেকে ভালো দিক হলো, AI SDK আমাদের জন্য সব complex কাজ সহজ করে দিয়েছে।

একটা কথা মনে রাখবেন। প্রতিটি AI request এর cost আছে। তাই শেখার সময় ছোট prompt ব্যবহার করুন এবং production এ যাওয়ার আগে usage monitor করুন।

এই লেসনের পর আপনি শুধু AI response দেখাতে জানেন না, আপনি জানেন কীভাবে professional level experience বানাতে হয়।

পরের লেসনে আমরা আরেকটু deep এ যাব। আমরা শিখব models আর tokens আসলে কী, কোন model কখন ব্যবহার করা উচিত, আর cost কীভাবে optimize করা যায়।
