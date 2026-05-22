export async function onRequestGet(context) {
  const raw = await context.env.VACATION_CONFIG.get('config');
  const data = raw ? JSON.parse(raw) : { vacationMode: false };
  return Response.json(data, {
    headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
  });
}
