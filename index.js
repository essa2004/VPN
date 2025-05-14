const http = require('http');
const url = require('url');
const httpProxy = require('http-proxy');

// إنشاء البروكسي
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

// متغير لحفظ آخر URL تم استخدامه
let lastUsedUrl = null;

// إنشاء الخادم وتوجيه الطلبات إلى الهدف المحدد
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // إذا تم تمرير URL جديد، خزنه
    if (query.url) {
        lastUsedUrl = query.url;
        console.log(`New URL received: ${lastUsedUrl}`);
    }

    // تحقق إذا كان هناك URL متاح لاستخدامه
    if (!lastUsedUrl) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error: No URL provided and no previous URL available');
        return;
    }

    console.log(`Proxying to: ${lastUsedUrl}`);
    proxy.web(req, res, { target: `https://${lastUsedUrl}` });
}).listen(3000, () => {
  console.log('Proxy running at http://localhost:3000');
});
