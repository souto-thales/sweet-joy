export async function onRequestPost(context) {
  try {
    const { password } = await context.request.json();

    if (!context.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Admin password not configured yet' }, { status: 503 });
    }

    if (!password || password !== context.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = crypto.randomUUID();
    await context.env.VACATION_CONFIG.put(`session:${token}`, '1', {
      expirationTtl: 60 * 60 * 24 * 30
    });

    return Response.json({ token });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
