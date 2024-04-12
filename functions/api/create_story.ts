import {Ai} from "@cloudflare/ai"

export async function onRequest(context) {
    // get the request
    const req = context.request as Request;
    const body = await req.json();

    if (!body.prompt) {
        return new Response("No prompt provided", { status: 400 });
    }

    // run the AI
    const ai = new Ai(context.env.AI);
    const result = await ai.run("@hf/thebloke/mistral-7b-instruct-v0.1-awq", {
        stream: false,
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant for an storyteller"
            },
            {
                role: "user",
                content: body.prompt
            }
        ],
    });
    
    return Response.json(result);
}
