function simpleServer() {
	var http = require("http")
	var server = http.createServer(function (req, res) {
		res.writeHead(200, {"Content-Type": "text/plain"})
		res.end("data\n")
	})
	server.listen(8080)
	}
function parseQuery() {
	var name = require("url").parse(req.url, true).query.name
	!name && (name = "query_name")		// default query name
	}
function readImage() {
	var fs = require("fs")
	var file = "name.png"
	fs.stat(file, function (err, stat) {
		if (err) {
			res.writeHead(200, {"Content-Type": "text/plain"})
			res.end("Sorry, apple is not around right now \n")
		} else {
			var img = fs.readFileSync(file)
			res.contentType = "image/png"
			res.contentLength = stat.size
			res.end(img, "binary")
		}
	});
	}



