export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url");

  if (!target) {
    return new Response("Missing ?url=", { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    let body = await res.text();

    // Fix relative links
    body = body.replace(/(href|src)=["'](\/[^"']*)["']/g, (m, p1, p2) => {
      const origin = new URL(target).origin;
      return `${p1}="${origin}${p2}"`;
    });

    return new Response(body, {
      headers: {
        "content-type": res.headers.get("content-type") || "text/html",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response("Error: " + err.message, { status: 500 });
  }
}
