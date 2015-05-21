module.exports = function () {
	return function (req, res, next) {
		"use strict";

		var fs = require('fs');
		var mime = require('mime');
		var path = require('path');

		var angularRoot = process.cwd() + '/gurt-app-client';
		var angularIndex = angularRoot + '/index.' + process.env.NODE_ENV + '.html';
		var filePath = angularRoot + req.path;
//console.log(angularIndex);
//console.log(req.path);
		sendFile(req.url == '/' ? angularIndex : filePath);

		function sendFile(filePath) {
			fs.exists(filePath, function (exists) {
				filePath = exists ? filePath : angularIndex;

				fs.readFile(filePath, function(err, data) {
					if (err) {
						console.log(err);
					} else {
						res.writeHead(200, {
							"content-type": mime.lookup(path.basename(filePath))
						});
						res.end(data);
					}
				});
			});
		}
	};
};
