const socks = require('socksv5');

socks.createServer((info, accept, deny) => {
    console.log('xxxxxxx');
  accept();
}).listen(1080, '0.0.0.0', () => {
  console.log('SOCKS5 proxy server listening on port 1080');
}).useAuth(socks.auth.None());