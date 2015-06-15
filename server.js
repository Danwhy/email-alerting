var Hapi = require("hapi");
var server = new Hapi.Server();
var http = require("http");
var Path = require("path");
var mandrill = require("mandrill-api/mandrill");
var mandrill_client = new mandrill.Mandrill(process.env.SECRET);

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
	var data = {
		
    	
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
	};
	mandrill_client.messages.send({"message": data, "async": false},function(result) {
		console.log(result);
	}, function(e) {
		console.log("Error " + e.message);
	});
}

server.start(function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Server is running");
});