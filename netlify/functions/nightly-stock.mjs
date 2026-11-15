const BATCHES = 4;

export default async () => {
  const site = (process.env.URL || process.env.DEPLOY_PRIME_URL || "").replace(/\/$/, "");
  const secret = process.env.CRON_SECRET?.trim();
  if (!site || !secret) {
    return new Response("Set URL and CRON_SECRET.", { status: 500 });
  }

  let added = 0;
  for (let index = 0; index < BATCHES; index += 1) {
    const response = await fetch(`${site}/api/studio/stock/replenish`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: 5 }),
    });
    const text = await response.text();
    if (!response.ok) {
      return new Response(text, { status: response.status });
    }
    try {
      const payload = JSON.parse(text);
      added += Number(payload.added) || 0;
    } catch {
      return new Response(text, { status: 500 });
    }
  }

  return new Response(JSON.stringify({ added }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  schedule: "0 18 * * *",
};
