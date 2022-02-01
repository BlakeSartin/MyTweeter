$(document).ready(function() {
  const maxChar = 140
  $("#tweet-text").keyup(function(){
    const numChar = $("#tweet-text").val().length
    console.log(numChar)
    $(".counter").text(maxChar - numChar)
  })
});