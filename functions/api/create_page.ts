import {Ai} from "@cloudflare/ai"

export async function onRequestPost(context) {
    // get the request
    const req = context.request as Request;
    const body = await req.json();

    if (!body.prompt) {
        return new Response("No prompt provided", { status: 400 });
    }

    // run the AI - extract background
    const ai = new Ai(context.env.AI);
    const backgroundPrompt = await ai.run("@hf/thebloke/mistral-7b-instruct-v0.1-awq", {
        stream: false,
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant to describe the best background image for a situation. Only return the background description without extra introduction. Keep it simple and concise."
            },
            {
                role: "user",
                content: body.prompt
            }
        ],
    });

    // run the AI - create background
    const result = await ai.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
        // @ts-expect-error
        prompt: backgroundPrompt.response
    });
      
    return new Response(result);
}
