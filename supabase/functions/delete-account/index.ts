import { withSupabase } from "npm:@supabase/server";

const allowedOrigin = "https://school-one-sable.vercel.app";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Vary": "Origin",
};

const deleteAccount = withSupabase({ auth: "user" }, async (req, ctx) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }

  const userId = ctx.userClaims?.id;
  if (!userId) {
    return Response.json({ error: "Please log in again." }, { status: 401 });
  }

  const { error } = await ctx.supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) {
    return Response.json(
      { error: "The account provider could not delete this account." },
      { status: 502 },
    );
  }

  return Response.json({ deleted: true });
});

export default {
  fetch: async (req: Request) => {
    const origin = req.headers.get("origin");
    if (origin && origin !== allowedOrigin) {
      return Response.json({ error: "Origin not allowed." }, { status: 403 });
    }

    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    try {
      const response = await deleteAccount(req);
      const headers = new Headers(response.headers);
      for (const [name, value] of Object.entries(corsHeaders)) {
        headers.set(name, value);
      }
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch {
      return Response.json(
        { error: "The account provider could not be reached." },
        { status: 502, headers: corsHeaders },
      );
    }
  },
};
