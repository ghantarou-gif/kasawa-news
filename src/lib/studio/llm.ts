type ChatMessage = { role: "system" | "user"; content: string };

function apiBase(): string {
  return (process.env.STUDIO_API_BASE?.trim() || "https://api.openai.com/v1").replace(
    /\/$/,
    "",
  );
}

function apiKey(): string {
  return process.env.STUDIO_API_KEY?.trim() ?? "";
}

function modelName(): string {
  return process.env.STUDIO_MODEL?.trim() || "gpt-4o-mini";
}

export function llmConfigured(): boolean {
  return Boolean(apiKey());
}

async function postChat(
  key: string,
  body: {
    model: string;
    temperature: number;
    messages: ChatMessage[];
    response_format?: { type: "json_object" };
  },
): Promise<Response> {
  const send = (payload: typeof body) =>
    fetch(`${apiBase()}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(60000),
      body: JSON.stringify(payload),
    });

  const response = await send(body);
  if (response.ok || response.status !== 400 || !body.response_format) return response;
  return send({
    model: body.model,
    temperature: body.temperature,
    messages: body.messages,
  });
}

function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const text = (fenced?.[1] ?? raw).trim();
  return JSON.parse(text) as unknown;
}

export async function chatJson<T>(
  messages: ChatMessage[],
  fallback: (value: unknown) => T,
): Promise<T> {
  const key = apiKey();
  if (!key) {
    throw new Error("Set STUDIO_API_KEY to generate posts.");
  }

  const body = {
    model: modelName(),
    temperature: 0.85,
    messages,
    response_format: { type: "json_object" as const },
  };

  const response = await postChat(key, body);
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`LLM error ${response.status}: ${detail.slice(0, 400)}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("LLM returned an empty response.");
  return fallback(extractJson(content));
}
