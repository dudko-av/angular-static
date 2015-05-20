module.exports = function (req, res, next) {
    //next();
    var fs = require('fs');
    var mime = require('../node_modules/mime');
    var path = require('../node_modules/path');
    var cache = {};

    var angularRoot = process.cwd() + '/gurt-app-client';
    var angularIndex = angularRoot + '/index.dev.html'
    var filePath = angularRoot + req.url;

    console.log(filePath);


    if (req.url == '/') {
        sendIndex(res);
    } else {
        sendFile(res);
    }

    function sendIndex (res) {
        fs.readFile(angularIndex, function (err, data) {
            res.writeHead(
                200,
                {"content-type": mime.lookup(path.basename(angularIndex))}
            );
            res.end(data);
        });
    }

    function sendFile (res) {
        fs.exists(filePath, function (exists) {
            if (exists) {
                fs.readFile(filePath, function (err, data) {
                    res.writeHead(
                        200,
                        {"content-type": mime.lookup(path.basename(filePath))}
                    );
                    res.end(data);
                });
            } else {
                sendIndex(res);
            }
        });
    }
}

