var Hapi = require("hapi");
var server = new Hapi.Server();
var http = require("http");
var Path = require("path");

server.connection({
	port: Number(process.argv[2] || 3000),
	host: "localhost"
});

server.route({
	method: "GET",
	path: "/{filename}",
	handler: {
		file: function(request){
			return request.params.filename;
		}
	}
});

server.route({
	method: "POST",
	path: "/signup",
	config: {
		handler: function(req, res) {
			sendEmail(req.payload.email);			
		}
	}
});

function sendEmail(email) {
	var req = http.request({
		host: "mandrillapp.com",
		path: "/api/1.0/messages/send.json",
		method: "POST"		
	});
	var data = {
		'key': process.env.SECRET,
    	'message': {
	      	'from_email': 'danwhy@gmail.com',
	      	'to': [
	          {
	            'email': email,
	            'name': 'dan',
	            'type': 'to'
	          }
	        ],
		      'autotext': 'true',
		      'subject': 'YOUR SUBJECT HERE!',
		      'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
		}
	
	};
	req.on("error", function(e) {
		console.log(e.message);
	});
	req.end(JSON.stringify(data));
}

server.start(function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Server is running");
});