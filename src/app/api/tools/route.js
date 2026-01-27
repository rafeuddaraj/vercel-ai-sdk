import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, tool } from "ai";
import z from "zod";

async function getWeatherByCity({
    city,
    type = "current",
    timezone = "auto"
}) {
    if (!city) {
        throw new Error("City name required");
    }

    /* STEP 1: City → Lat/Lon */
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
    }

    const { latitude, longitude } = geoData.results[0];

    /* STEP 2: Weather */
    let params = "";

    if (type === "current") {
        params = "current=temperature_2m,relative_humidity_2m,wind_speed_10m";
    }

    if (type === "hourly") {
        params = "hourly=temperature_2m,precipitation";
    }

    if (type === "daily") {
        params = "daily=temperature_2m_max,temperature_2m_min";
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${params}&timezone=${timezone}`;

    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    return {
        city,
        latitude,
        longitude,
        weather: weatherData
    };
}

const tools = {
    getWeather: tool({
        description: "Get the wather by city, and type, current, hourly and daily",
        inputSchema: z.object({
            city: z.string(),
            type: z.string().optional().default("current"),
            timezone: z.string().optional().default("auto")
        }),
        execute: getWeatherByCity
    })
}

export const POST = async (req) => {
    const { messages } = await req.json();
    try {
        const modelMessages = await await convertToModelMessages(messages)
        const result = await streamText({
            model: openai("gpt-4.1-nano"),
            messages: [
                ...modelMessages
            ],
            // tools,
            // stopWhen: stepCountIs(2)
        })
        return result.toUIMessageStreamResponse()
    } catch (err) {
        console.error("Chat Streaming error occured", err);
        return new Response(JSON.stringify({ err: err.message }), { status: 5000 })
    }
}