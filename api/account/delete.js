const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const projectUrl = process.env.SUPABASE_URL;
  const adminKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const authHeader = req.headers.authorization || '';
  const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!projectUrl || !adminKey) {
    return res.status(503).json({ error: 'Account deletion is not configured on the server yet.' });
  }
  if (!accessToken) return res.status(401).json({ error: 'Please log in again.' });

  try {
    const admin = createClient(projectUrl, adminKey, {
      auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
    });
    const { data, error: verifyError } = await admin.auth.getUser(accessToken);
    if (verifyError || !data.user?.id) {
      return res.status(401).json({ error: 'Your session expired. Log in again.' });
    }

    const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
    if (deleteError) {
      return res.status(502).json({ error: 'The account provider could not delete this account.' });
    }
    return res.status(200).json({ deleted: true });
  } catch {
    return res.status(502).json({ error: 'The account provider could not be reached.' });
  }
};
