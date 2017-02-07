module.exports = function(pxhost, pxport, pxlisten) {
    var http=require('http');
    var url=require('url');
    var server=http.createServer(function(sreq,sres){
        var url_parts=url.parse(sreq.url);
        var headers = sreq.headers;
        headers.host = pxhost || '127.0.0.1';
        var opts={
            port: pxport || 8080,
            host: pxhost || '127.0.0.1',
            path:url_parts.pathname,
            headers:headers,
            method: sreq.method
        };
        var creq=http.request(opts,function(cres){
            sres.writeHead(cres.statusCode,cres.headers);
            cres.pipe(sres);
        });
        sreq.pipe(creq);
    });
    server.listen(pxlisten || 8090);
}