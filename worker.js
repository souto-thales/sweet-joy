const ALLOWED_ORIGIN = 'https://sweetjoycakes.com';

const CORS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function cors(body, init = {}) {
  const res = body instanceof Response ? body : Response.json(body, init);
  Object.entries(CORS).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const method = request.method;

    // Preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (pathname === '/api/health') {
      return cors({ ok: true, worker: 'sweet-joy' });
    }
    if (pathname === '/api/vacation' && method === 'GET') {
      return cors(await getVacation(env));
    }
    if (pathname === '/api/admin/login' && method === 'POST') {
      return cors(await adminLogin(request, env));
    }
    if (pathname === '/api/admin/vacation' && method === 'POST') {
      return cors(await adminVacation(request, env));
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
