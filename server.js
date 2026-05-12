const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Carrega o .env sem precisar de npm
(function loadEnv() {
    try {
        fs.readFileSync(path.join(__dirname, '.env'), 'utf8')
            .split('\n')
            .forEach(line => {
                const eq = line.indexOf('=');
                if (eq > 0) {
                    const key = line.slice(0, eq).trim();
                    const val = line.slice(eq + 1).trim();
                    if (key && !key.startsWith('#')) process.env[key] = val;
                }
            });
    } catch {}
})();

const PORT = 3000;
const HTML = path.join(__dirname, 'codeburger_extremamente_atualizado.html');

http.createServer((req, res) => {

    // Serve o HTML na raiz
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(HTML).pipe(res);
        return;
    }

    // Proxy do /api/order para o Apps Script (esconde a URL do cliente)
    if (req.method === 'POST' && req.url === '/api/order') {
        const scriptUrl = process.env.APPS_SCRIPT_URL;
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            if (!scriptUrl) {
                console.warn('[aviso] APPS_SCRIPT_URL nao definida — pedido nao registado no Sheets');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: true }));
                return;
            }
            try {
                const u = new URL(scriptUrl);
                const opts = {
                    hostname: u.hostname,
                    path: u.pathname + u.search,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(body)
                    }
                };
                const proxy = https.request(opts, () => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: true }));
                });
                proxy.on('error', err => {
                    console.error('[erro] Apps Script:', err.message);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: true }));
                });
                proxy.write(body);
                proxy.end();
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server error' }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end('Not found');

}).listen(PORT, () => {
    console.log('\nCodeBurger local: http://localhost:' + PORT);
    console.log('Google Sheets:    ' + (process.env.APPS_SCRIPT_URL ? 'conectado' : 'SEM APPS_SCRIPT_URL (verifica o .env)') + '\n');
});
