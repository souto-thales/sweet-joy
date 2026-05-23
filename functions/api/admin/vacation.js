async function validateToken(env, request) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token) return false;
  const val = await env.VACATION_CONFIG.get(`session:${token}`);
  return val !== null;
}

export async function onRequestPost(context) {
  try {
    const valid = await validateToken(context.env, context.request);
    if (!valid) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await context.request.json();
    await context.env.VACATION_CONFIG.put('config', JSON.stringify(body));
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
