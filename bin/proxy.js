module.exports = function(proxyConfig) {
    var http = require('http'),
            url = require('url'),
            {
                pxlisten,
                pxhostPage,
                pxportPage,
                pxhostApi,
                pxportApi
            } = proxyConfig;

    var server = http.createServer(function(req,res) {
        var url_parts = url.parse(req.url),
                headers = req.headers,
                opts, pxReq1, pxReq2;

        headers.host = pxhostPage || '127.0.0.1';
        opts = {
            port: pxportPage || 8080,
            host: pxhostPage || '127.0.0.1',
            path:url_parts.pathname,
            headers:headers,
            method: req.method
        };
        pxReq1 = http.request(opts, function(pxRes1) {
            if(pxRes1.statusCode != '404') {
                res.writeHead(pxRes1.statusCode, pxRes1.headers);
                pxRes1.pipe(res);
            } else {
                opts.port = pxportApi;
                opts.host = pxhostApi;

                pxReq2 = http.request(opts, function(pxRes2) {
                    res.writeHead(pxRes2.statusCode, pxRes2.headers);
                    pxRes2.pipe(res);
                }).on('error', function(err) {
                    console.log('no find or server error');
                    res.end('no find or server error');
                });


                req.pipe(pxReq2);
            }

        }).on('error', function(err) {
            console.log('server error');
            res.end('server error');
        });

        req.pipe(pxReq1);
    });
    server.listen(pxlisten || 8090);
}