$('#submit').click(function() {
$.ajax({
  type: "POST",
  url: "https://mandrillapp.com/api/1.0/messages/send.json",
  data: {
    "key": "xHE_KgsRxGwq3xaCVukYaA",
    "message": {
      "from_email": "a.nita@hotmail.co.uk",
      "to": [
          {
            "email": $("#email").val(),
            "name": "Anita",
            "type": "to"
          }
        ],
      "autotext": "true",
      "subject": "YOUR SUBJECT HERE!",
      "html": "YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!"
    }
  }
 }).done(function(response) {
   console.log(response); // if you're into that sorta thing
 });
});
