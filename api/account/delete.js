module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const projectUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const authHeader = req.headers.authorization || '';
  const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!projectUrl || !serviceKey) {
    return res.status(503).json({ error: 'Account deletion is not configured on the server yet.' });
  }
  if (!accessToken) return res.status(401).json({ error: 'Please log in again.' });
  try {
    const base = projectUrl.replace(/\/$/, '');
    const verify = await fetch(base + '/auth/v1/user', {
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + accessToken }
    });
    if (!verify.ok) return res.status(401).json({ error: 'Your session expired. Log in again.' });
    const user = await verify.json();
    if (!user.id) return res.status(401).json({ error: 'Could not verify the account session.' });
    const deleted = await fetch(base + '/auth/v1/admin/users/' + encodeURIComponent(user.id), {
      method: 'DELETE',
      headers: { apikey: serviceKey, Authorization: 'Bearer ' + serviceKey }
    });
    if (!deleted.ok) return res.status(502).json({ error: 'The account provider could not delete this account.' });
    return res.status(200).json({ deleted: true });
  } catch {
    return res.status(502).json({ error: 'The account provider could not be reached.' });
  }
};
