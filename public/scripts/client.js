/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(() => {
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
      
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };
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

  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  renderTweets([tweetData, tweetData])
});


  
