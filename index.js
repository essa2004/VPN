const http = require('http');
const httpProxy = require('http-proxy');

// إنشاء البروكسي
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

// إنشاء الخادم وتوجيه الطلبات إلى الهدف المحدد
http.createServer((req, res) => {
proxy.web(req, res, { target: 'https://www.pornhub.com' });
}).listen(3000, () => {
console.log('Proxy running at http://localhost:3000');
});
