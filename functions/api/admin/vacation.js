export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    await context.env.VACATION_CONFIG.put('config', JSON.stringify(body));
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
