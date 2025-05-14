const http = require('http');
const url = require('url');
const httpProxy = require('http-proxy');

// إنشاء البروكسي
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

// إنشاء الخادم وتوجيه الطلبات إلى الهدف المحدد
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // تحقق من أن الكويري يحتوي على قيمة صالحة
    if (!query.url) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error: URL query parameter is missing or invalid');
        return;
    }

    console.log(`Requesting URL: ${query.url}`);

    proxy.web(req, res, { target: `https://${query.url}` });
}).listen(3000, () => {
  console.log('Proxy running at http://localhost:3000');
});