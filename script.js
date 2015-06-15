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