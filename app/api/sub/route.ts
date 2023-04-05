if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export async function POST(req: Request): Promise<Response> {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 2048,
    n: 1,
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return new Response(result.choices[0].message.content);
}

// const { Configuration, OpenAIApi } = require("openai");
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const q = searchParams.get("q");
//     const configuration = new Configuration({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//     const openai = new OpenAIApi(configuration);
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: q }],
//     });

//   return NextResponse.json(completion.data.choices[0].message.content);
// }
