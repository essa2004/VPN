const ProxyChain = require('proxy-chain');

const server = new ProxyChain.Server({
    port: 8080,
    // هذه الدالة تُستدعى عند كل طلب يدخل عبر البروكسي
    prepareRequestFunction: ({ request }) => {
        console.log(`send:: ${request.url}`);
        return {
            requestAuthentication: false,
            upstreamProxyUrl: null, // لا نريد تحويل الطلب إلى بروكسي خارجي
        };
    },
});

server.listen(() => {
    console.log('خادم البروكسي يعمل على المنفذ 8080');
});