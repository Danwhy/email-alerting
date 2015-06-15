# email-alerting

## What is this?

This is a tutorial for setting up email alerts on your application using Mandrill, a delivery API for sending transactional emails from websites and applications.

Depending on your objectives, you'll want to start at different points in this tutorial. The first part of the tutorial is a basic introduction to using Mandrill front-end, whereas the second part of the tutorial is more practical for using it server-side with hapi. It's worth going through the process front-end before you graduate to back-end email alerting.

* [Very basic front end tutorial](https://github.com/Danwhy/email-alerting#front-end-tutorial)
* More complex back end tutorial

## Why use Mandrill?

Mandrill is a very popular API for sending transactional emails, run by MailChimp: one of the tech industry's largest email marketing providers. The first 12,000 emails per month are free.

## Front-end tutorial

This tutorial will teach you how to send an email from the front-end of your website, with no server-side coding necessary. All credit to [this tutorial](https://medium.com/@mariusc23/send-an-email-using-only-javascript-b53319616782) for teaching us how to do it first (and providing the sample code).

### Step 1: get an API key

Register for [Mandrill](http://mandrillapp.com/). Sign in to get an API key on the "Settings" page.

### Step 2: load jQuery

You will need jQuery for this tutorial (although you're welcome to write your own AJAX call or use another library). Load it in script tags at the bottom of your HTML file.

```javascript
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
</script>
```

### Step 3: use the $.ajax function to send an email

Write an AJAX request to the Mandrill API like so. Full list of message parameters can be found [here](https://mandrillapp.com/api/docs/messages.html).

```javascript
$.ajax({
  type: “POST”,
  url: “https://mandrillapp.com/api/1.0/messages/send.json”,
  data: {
    ‘key’: ‘YOUR API KEY HERE’,
    ‘message’: {
      ‘from_email’: ‘YOUR@EMAIL.HERE’,
      ‘to’: [
          {
            ‘email’: ‘RECIPIENT_NO_1@EMAIL.HERE’,
            ‘name’: ‘RECIPIENT NAME (OPTIONAL)’,
            ‘type’: ‘to’
          },
          {
            ‘email’: ‘RECIPIENT_NO_2@EMAIL.HERE’,
            ‘name’: ‘ANOTHER RECIPIENT NAME (OPTIONAL)’,
            ‘type’: ‘to’
          }
        ],
      ‘autotext’: ‘true’,
      ‘subject’: ‘YOUR SUBJECT HERE!’,
      ‘html’: ‘YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!’
    }
  }
 }).done(function(response) {
 });
 ```

### Optional Step 4: make this happen on click of a button

 You might want to send the email when a button is clicked. You can do this like so.

 ```javascript
 $('#yourButtonId').click(function() {
  $.ajax({
    // insert your AJAX request here
  });
});
```

### Limitations

This method is really just to illustrate the concept of communicating with the Mandrill API. Doing this process front-end is not a good idea, as your API key will be visible to everyone visiting your site.

## Back-end tutorial

This part of the tutorial will show you how to send email alerts server-side using hapi and the Mandrill Node.js API.

### Step 1: make the request on the client side

Make a post request to send the emails. We did this using jQuery, like so:

```javascript
$('#send').click(function() {
$.ajax({
  type: 'POST',
  url: '/signup',
  data: {
    "email": $("#email").val()
    }
 }).done(function(response) {
   console.log("testing"); // if you're into that sorta thing
 });
});
```

### Step 2: set up the hapi server

Set up a simple hapi server with two routes: one to fetch the index.html file, and another to receive the post request with the email address.

You'll see we require hapi and the Mandrill API. We've also stored the API key in an environment variable called "SECRET".

```javascript
var Hapi = require("hapi");
var server = new Hapi.Server();
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
```
### Step 3: set up a function to send the email using the Mandrill API

Write a function to send the email, using the Mandrill API. This function "sendEmail" sends posts requests to the Mandrill client which in turn sends the email to the user.

```javascript
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
```
### Step 4: start the server

Start the server with "server.start" which listens for requests from the client.

```javascript
server.start(function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Server is running");
});
```

## How to run the demo

The files in this repo are the demo we built for the back-end tutorial. You can run the project yourself by cloning the repo and running it on a server.

You will need to have node.js, nodemon and hapi installed, plus a basic understanding of git and your terminal to get this working.

### 1. Clone the repo

```sh
git clone https://github.com/Danwhy/email-alerting
```

### 2. Install the node.js dependencies:

```sh
npm install
```

### 3. Run the Server with [Nodemon](https://github.com/remy/nodemon):

```sh
nodemon server.js
```
### 4. Go to localhost:8000 in your browser.
