const ALLOWED_ORIGIN = 'https://sweetjoycakes.com';

const CORS_PUBLIC = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const CORS_ADMIN = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function withCors(response, corsHeaders) {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));
  return new Response(response.body, { status: response.status, headers });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const method = request.method;

    if (method === 'OPTIONS') {
      const isAdmin = pathname.startsWith('/api/admin');
      return new Response(null, {
        status: 204,
        headers: isAdmin ? CORS_ADMIN : CORS_PUBLIC,
      });
    }

    if (pathname === '/api/health') {
      return withCors(Response.json({ ok: true, worker: 'sweet-joy' }), CORS_PUBLIC);
    }
    if (pathname === '/api/vacation' && method === 'GET') {
      return withCors(await getVacation(env), CORS_PUBLIC);
    }
    if (pathname === '/api/admin/login' && method === 'POST') {
      return withCors(await adminLogin(request, env), CORS_ADMIN);
    }
    if (pathname === '/api/admin/vacation' && method === 'POST') {
      return withCors(await adminVacation(request, env), CORS_ADMIN);
    }

    return env.ASSETS.fetch(request);
  }
};

async function getVacation(env) {
  const raw = await env.VACATION_CONFIG.get('config');
  const data = raw ? JSON.parse(raw) : { vacationMode: false };
  return Response.json(data, {
    headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
  });
}

async function adminLogin(request, env) {
  try {
    const { password } = await request.json();
    if (!env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Admin password not configured yet' }, { status: 503 });
    }
    if (!password || password !== env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }
    const token = crypto.randomUUID();
    await env.VACATION_CONFIG.put(`session:${token}`, '1', {
      expirationTtl: 60 * 60 * 24 * 30
    });
    return Response.json({ token });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}

async function adminVacation(request, env) {
  try {
    const auth = request.headers.get('Authorization') || '';
    const token = auth.replace('Bearer ', '').trim();
    if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const val = await env.VACATION_CONFIG.get(`session:${token}`);
    if (val === null) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    await env.VACATION_CONFIG.put('config', JSON.stringify(body));
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
