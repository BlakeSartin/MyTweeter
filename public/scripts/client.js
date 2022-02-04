/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { post } = require("request");




$(() => {
  $(".nav_newtweet").click(function(event){
    if($('#compose-tweet').css("display") === "none") {
    $("#compose-tweet").slideDown()
    }else{
      $("#compose-tweet").slideUp()
    }
  })

//Tweet Submission
  $("#compose-tweet").submit(function(event){
    event.preventDefault()
    console.log("submitting form!")
    const data = $(this).serialize()
    const textData = data.slice(6)
    console.log(textData)
    if (!textData) {
      $('.empty-tweet').slideDown()
      return
    } 
    if(textData.length >140) {
      $('.too-long').slideDown()
      return
    }
    $.ajax({
      type:"POST",
      url: "/tweets",
      data: data,
    }).then(() => {
      loadTweets()
      $('.too-long').slideUp()
      $('.empty-tweet').slideUp()
      $("#tweet-text").val('')
    })   
  })
 


  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
    
  }
  
 

  const loadTweets = function(){
    $.get("/tweets", function(data){
      renderTweets(data);
    });
  }

  const createTweetElement = function (tweetObject) {
    console.log(tweetObject)
    const $tweet = $("<article>").addClass("tweet");

    const $img = $("<img>").attr("src", tweetObject.user.avatars);
    const $name = $("<h4>").text(tweetObject.user.name);
    const $username = $("<h4>").text(tweetObject.user.handle);
    const $div = $("<div>").append($img).append($name);
    const $div2 = $("<div>").append($username);
    const $header = $("<header>")
      .addClass("tweet-header")
      .append($div)
      .append($div2);
    $tweet.append($header);

    const $tweetContent = $("<p>").text(tweetObject.content.text);
    const $div3 = $("<div>").addClass("tweet-text").append($tweetContent);

    $tweet.append($div3);

    const timeCreated = $("<span>").text(
      timeago.format(tweetObject.created_at)
    );
    const flagIcon = $("<i>").addClass("fas fa-flag fa-sm");
    const retweetIcon = $("<i>").addClass("fas fa-retweet fa-sm");
    const heartIcon = $("<i>").addClass("fas fa-heart fa-sm");
    const $div4 = $("<div>")
      .append(flagIcon)
      .append(retweetIcon)
      .append(heartIcon);

    const $footer = $("<footer>")
      .addClass("tweet-footer")
      .append(timeCreated)
      .append($div4);

    $tweet.append($footer);
    return $tweet;
  };

loadTweets()



});


  
