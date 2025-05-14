const http = require('http');
const url = require('url');
const httpProxy = require('http-proxy');

// إنشاء البروكسي
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

// ذاكرة لتخزين آخر URL تم استخدامه
let lastUsedUrl = null;

// إنشاء الخادم
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // إذا وُجد URL جديد يتم تخزينه
    if (query.url) {
        lastUsedUrl = query.url;
        console.log(`تم تحديث العنوان إلى: ${lastUsedUrl}`);
    }

    // إذا لم يتم إرسال URL ولكن لدينا عنوان سابق، نستخدمه
    if (lastUsedUrl) {
        proxy.web(req, res, { target: `https://${lastUsedUrl}` });
    } else {
        // لا يوجد عنوان جديد ولا قديم، نكمل الاتصال بصمت
        res.writeHead(204); // No Content
        res.end();
    }
}).listen(3000, () => {
    console.log('Proxy running at http://localhost:3000');
});
