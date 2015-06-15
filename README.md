# email-alerting

## What is this?

This is a tutorial for setting up email alerts on your application using Mandrill, a delivery API for sending transactional emails from websites and applications.

Depending on your objectives, you'll want to start at different points in this tutorial. The first part of the tutorial is a basic introduction to using Mandrill front-end, whereas the second part of the tutorial is more practical for using it server-side. It's worth going through the process front-end before you graduate to back-end email alerting.

* Very basic front end tutorial
* More complex back end tutorial

## Why use Mandrill?

Mandrill is a very popular API for sending transactional emails, run by MailChimp: one of the tech industry's largest email marketing providers. The first 12,000 emails per month are free.

## Front-end tutorial

This tutorial will teach you how to send an email from the front-end of your website, with no server-side coding necessary. All credit to [this tutorial](https://medium.com/@mariusc23/send-an-email-using-only-javascript-b53319616782) for teaching us how to do it first.

### Step 1: get an API key

Register for [Mandrill](http://mandrillapp.com/). Sign in to get an API key on the "Settings" page.

### Step 2: load jQuery

You will need jQuery for this tutorial (although you're welcome to write your own AJAX call or use another library) Load it in script tags at the bottom of your HTML file.

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
