function globalVars() {
	global 		// 
	process		// bridge between node app and environment
	buffer		// raw binary data allocated outside V8 heap
	}
function buffer() {
	var buf = new Buffer(24); buf.fill(0)		// buffer is not initialized, better fill it with zeros
	var arr = [1,2,3]; var buf = Buffer.from(arr)		// return buffer with a copy of content
	var buf = Buffer.alloc(10)					// creates filled buffer of a certain size
	var buf = Buffer.allocUnsafe()				// creates buffer of a certain size, may contain trash

	// from buffer to json and back
	var buf = new Buffer("string"); var json = JSON.stringify(buf)
	var buf = new Buffer(JSON.parse(json).data)	// console.log(buf.toString())
	}
function exportFromModule() {
	exports.funcName = function(input) { }								// external module "externalName"
	var name = require("./externalName").funcName; name("input")		// app.js
	}
function simpleServer() {
	var http = require("http")
	var server = http.createServer()

	server.on("request", function (request, response) {
		console.log("request event")
		response.writeHead(200, {"Content-Type": "text/plain"})
		response.end('data\n')
	})
	server.on("connection", function() {
		console.log("connection event")
	})
	server.listen(8080, function() {
		console.log("listening event")
	})
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



var http = require("http")
var fib = function (n) {
	if (n < 2) return n;
	return fib(n - 1) + fib(n - 2);
}
var Obj = function() { }
Obj.prototype.doSomething = function(arg1_) {
	var callback_ = arguments[arguments.length - 1]
	var callback = (typeof(callback_) === "function" ? callback_ : null)
	var arg1 = typeof arg1_ === "number" ? arg1_ : null
	if (!arg1) return callback(new Error("first arg missing or not a number"), null)
	process.nextTick(function() {
		var data = fib(arg1); callback(null, data)
	})
}

var server = http.createServer()
server.on("request", function (request, response) {
	var test = new Obj()
	var number = 10
	test.doSomething(number, function(err,value) {
		if (err) console.error(err)
		else {
			var result = `Fibonaci value for ${number} is ${value}`
			response.writeHead(200, {"Content-Type": "text/plain"})
			response.end(result)

		}
	})
})
server.listen(8080, function() {
	console.log("listening event")
})
