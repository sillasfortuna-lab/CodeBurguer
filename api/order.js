module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const url = process.env.APPS_SCRIPT_URL;
    if (!url) {
        return res.status(500).json({ error: 'Server not configured' });
    }
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
        });
        return res.status(200).json({ ok: true });
    } catch {
        return res.status(500).json({ error: 'Failed to register order' });
    }
};
