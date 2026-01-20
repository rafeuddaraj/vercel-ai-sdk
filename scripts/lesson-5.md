আগের কয়েকটি lesson এ আমরা হাতে কলমে দেখেছি কীভাবে Next.js আর Vercel AI SDK ব্যবহার করে AI powered text completion এবং streaming feature বানানো যায়। আমরা কোড লিখেছি, API route বানিয়েছি, UI তৈরি করেছি এবং real time response দেখেছি। কিন্তু আজকের lesson টা একটু আলাদা। আজ আমরা কোনো নতুন feature বানাতে যাচ্ছি না। বরং আমরা বুঝব, আমরা আসলে যেটা ব্যবহার করছি, সেটা কী। বিশেষ করে “model” বলতে কী বোঝায়, কেন আমরা একটি নির্দিষ্ট model ব্যবহার করছি, আর বাস্তব প্রোজেক্টে গেলে কীভাবে সঠিক model নির্বাচন করতে হয়।

একদম সহজ ভাষায় শুরু করি। একটি AI model হলো এমন একটি প্রোগ্রাম যেটাকে বিপুল পরিমাণ ডেটা দিয়ে train করা হয়েছে, যাতে সে pattern বুঝতে পারে এবং নিজে থেকে সিদ্ধান্ত নিতে পারে বা উত্তর তৈরি করতে পারে। আপনি এটাকে এমন একজন খুব বুদ্ধিমান সহকারী হিসেবে ভাবতে পারেন, যে লক্ষ লক্ষ বই পড়ে ফেলেছে এবং এখন সেই জ্ঞান ব্যবহার করে আপনাকে লেখা, বিশ্লেষণ, ব্যাখ্যা বা আইডিয়া দিতে পারে। বাস্তব জীবনে আমরা প্রতিদিন AI model ব্যবহার করি, ফোনের keyboard এ auto complete থেকে শুরু করে recommendation system পর্যন্ত সব জায়গায়।

একজন application developer হিসেবে আমাদের জন্য সবচেয়ে গুরুত্বপূর্ণ হলো, সব model একরকম না। ভিন্ন ভিন্ন কাজের জন্য ভিন্ন ধরনের model আছে। প্রথম এবং সবচেয়ে বেশি ব্যবহৃত হলো text generation model। এগুলোই আসলে LLM বা Large Language Model নামে পরিচিত। এই model গুলো মানুষের মতো লেখা বুঝতে পারে এবং মানুষের মতো লেখা তৈরি করতে পারে। আপনি যখন chat bot বানান, content generate করেন, প্রশ্নের উত্তর দেন বা code assist বানান, তখন এই ধরনের model ই ব্যবহার করেন। GPT-4 family, Claude, Gemini এগুলো সবই এই ক্যাটাগরিতে পড়ে।

এরপর আসে embedding model। এগুলো সরাসরি লেখা তৈরি করে না। বরং লেখা কে সংখ্যায় রূপান্তর করে। এই সংখ্যাগুলো আসলে লেখা বা বাক্যের অর্থকে represent করে। সহজ করে বললে, একই ধরনের অর্থ যেসব লেখার আছে, সেগুলো সংখ্যার দিক থেকে কাছাকাছি হয়। এই ধরনের model ব্যবহার হয় search, recommendation, similarity check এর মতো কাজে। আপনি হয়তো সরাসরি এখনই এগুলো ব্যবহার করবেন না, কিন্তু ভবিষ্যতে advanced AI feature বানাতে গেলে এগুলো খুব গুরুত্বপূর্ণ হয়ে উঠবে।

এরপর আছে image model। এই model গুলো দিয়ে আপনি লেখা থেকে ছবি তৈরি করতে পারেন, আবার ছবি বিশ্লেষণও করতে পারেন। যেমন আপনি লিখলেন “একটি futuristic শহরের ছবি”, আর model আপনাকে একটা ছবি বানিয়ে দিল। অথবা আপনি একটি ছবি upload করে জিজ্ঞেস করলেন, এই ছবিতে কী আছে। এই model গুলো e-commerce, content creation আর design related অ্যাপে খুব জনপ্রিয়।

সবশেষে আছে multimodal model। এগুলো সবচেয়ে শক্তিশালী। কারণ এগুলো একসাথে লেখা, ছবি, কখনো audio পর্যন্ত বুঝতে পারে। আপনি একসাথে text আর image দিলেন, model দুটোই বুঝে উত্তর দিল। এগুলো খুব flexible, কিন্তু সাধারণত cost বেশি হয়। তাই সব জায়গায় এগুলো ব্যবহার করা হয় না।

এখন ধরুন, আপনি জানলেন বিভিন্ন ধরনের model আছে। কিন্তু কোন model ভালো আর কোনটা খারাপ, সেটা কীভাবে বুঝবেন? এখানেই আসে model এর কিছু গুরুত্বপূর্ণ characteristic। প্রথমটা হলো context window। context window মানে হলো, model একবারে কতটুকু তথ্য মনে রাখতে পারে। আপনি যদি ছোট প্রশ্ন করেন, তাহলে ছোট context window ই যথেষ্ট। কিন্তু যদি আপনি বড় document analyse করেন, তাহলে বড় context window দরকার। তাই প্রোজেক্ট অনুযায়ী context window ভাবা খুব জরুরি।

দ্বিতীয়টা হলো intelligence বা capability। সব model সমান বুদ্ধিমান না। কিছু model খুব দ্রুত simple কাজ করে, কিন্তু জটিল নির্দেশ বুঝতে পারে না। আবার কিছু model খুব ভালোভাবে complex instruction follow করতে পারে, creative output দিতে পারে, কিন্তু একটু ধীর। আপনি যদি FAQ বা simple Q&A বানান, তাহলে খুব powerful model দরকার নেই। কিন্তু creative writing, analysis বা decision making লাগলে ভালো model বেছে নিতে হবে।

তৃতীয়টা হলো speed। user experience এর জন্য speed খুব গুরুত্বপূর্ণ। কেউ chat app এ বসে ২০ সেকেন্ড অপেক্ষা করতে চায় না। তাই real time feature এর জন্য fast model দরকার। আবার background এ report generate করলে speed ততটা গুরুত্বপূর্ণ না।

চতুর্থ এবং বাস্তব দিক থেকে সবচেয়ে গুরুত্বপূর্ণ হলো cost। যত powerful model, সাধারণত তত বেশি cost। তাই সব সময় সবচেয়ে শক্তিশালী model ব্যবহার করাই বুদ্ধিমানের কাজ না। শেখার সময় বা development stage এ cheaper model ব্যবহার করা খুব ভালো সিদ্ধান্ত।

এখন একটা practical framework বলি। যদি আপনার feature real time হয়, যেমন autocomplete বা chat, তাহলে speed কে priority দিন। যদি content quality সবচেয়ে গুরুত্বপূর্ণ হয়, যেমন blog বা marketing copy, তাহলে intelligence কে priority দিন। যদি বড় document নিয়ে কাজ করেন, তাহলে context window দেখুন। আর সব ক্ষেত্রেই শুরুতে cheap model দিয়ে শুরু করুন, পরে দরকার হলে upgrade করুন।

এখন প্রশ্ন আসে, এই model গুলো কে বানায়? এখানেই আসে provider এর ধারণা। model যদি গাড়ি হয়, provider হলো গাড়ির কোম্পানি। OpenAI, Anthropic, Google এগুলো হলো provider। তারা model তৈরি করে, train করে এবং API হিসেবে আমাদের ব্যবহার করতে দেয়। আমরা আমাদের কোডে আসলে provider আর model দুটোই specify করি।

আমাদের আগের code গুলো দেখলে বুঝবেন, আমরা OpenAI কে provider হিসেবে ব্যবহার করেছি এবং GPT-4.1 Nano কে model হিসেবে ব্যবহার করেছি। এই GPT-4.1 Nano শেখার জন্য দারুণ, কারণ এটা fast এবং cost effective। সবচেয়ে ভালো ব্যাপার হলো, Vercel AI SDK ব্যবহার করলে provider বা model change করা খুব সহজ।

এখন একটা actionable জিনিস বলি। আপনি চাইলে খুব সহজেই OpenAI থেকে Anthropic এ switch করতে পারেন। এর জন্য আপনাকে শুধু “npm install @ai-sdk/anthropic” এই package install করতে হবে, তারপর env.local ফাইলে আপনার Anthropic API key যোগ করতে হবে। এরপর route.ts ফাইলে model এর জায়গায় OpenAI এর বদলে Anthropic আর নির্দিষ্ট model name লিখলেই কাজ শেষ। “এক লাইনের change দিয়েই provider switch করা সম্ভব”। এটা production app এর জন্য অনেক বড় সুবিধা।

Lesson এর শেষে একটা গুরুত্বপূর্ণ বাস্তব কথা বলি। প্রতিটা API call এর পেছনে টাকা খরচ হয়। তাই শুরুতেই বড় বড় prompt দিয়ে experiment করবেন না। “প্রথমে ছোট prompt দিয়ে test করুন”, “usage dashboard নিয়মিত চেক করুন”, আর “যখনই বুঝবেন feature কাজ করছে, তখনই optimize করা শুরু করুন”। এভাবেই একজন smart developer AI ব্যবহার করে।

এই lesson এ আমরা code কম লিখেছি, কিন্তু concept অনেক শিখেছি। model কী, provider কী, কীভাবে সঠিক model বাছাই করতে হয় এবং ভবিষ্যতে কীভাবে flexible architecture বানাতে হয়। পরের lesson এ আমরা আরও ভিতরের একটা বিষয় শিখব, সেটা হলো tokens। tokens বুঝতে পারলে আপনি cost control আর performance দুটোই অনেক ভালোভাবে manage করতে পারবেন।