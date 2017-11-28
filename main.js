function globalVars() {
	global 		// 
	process		// bridge between node app and environment
	buffer		// raw binary data allocated outside V8 heap
	}
function exportFromModule() {
	exports.funcName = function(input) { }								// external module "externalName"
	var name = require("./externalName").funcName; name("input")		// app.js
	}
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
			console.error(err)
			res.writeHead(200, {"Content-Type": "text/plain"})
			res.end("Sorry, file cannot be found\n")
		} else {
			fs.readFile(file, function(err,data) {
				res.contentType = "image/png"
				res.contentLength = stat.size
				res.end(data, "binary")
			})
		}
	})
	}
function standardStreams() {
	process.stdin.setEncoding("utf8")
	process.stdin.on("readable", function() {
		var input = process.stdin.read()
		if (input !== null) {
			process.stdout.write(input)
			var command = input.trim()
			if (command === "q") process.exit(0)
		}
	})
}

