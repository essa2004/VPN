const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 8080;

const server = http.createServer((req, res) => {
  // استخراج عنوان الموقع من المسار
  const targetUrl = req.url.slice(1); // إزالة أول "/"
  
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('يرجى كتابة العنوان كاملاً مع http:// أو https://');
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('الرابط غير صالح');
  }

  const protocol = parsedUrl.protocol === 'https:' ? https : http;

  const proxyReq = protocol.get(targetUrl, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('حدث خطأ أثناء الاتصال: ' + err.message);
  });
});

server.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
