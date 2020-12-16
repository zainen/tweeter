/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const listTweets = []


const createTweetElement = function (obj) {
  // const $tweet = $(`<article class="tweet">Hello world</article>`);
  // return $tweet
    const twit = $(`
    <article>
    <header class="twit-Top">
    <b>${obj.user.name}</b>
    <b>${obj.user.handle}</b>
    </header>
    <p class="past-Twit">
    ${obj.content.text}
    </p>
    <footer class="twit-Bot>
    <p>
    ${obj.created_at}
    </p>
    <p>
    ${obj.user.avatars}
    </p>
    </footer>
    </article>
    `)
    return twit
}
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    listTweets.push(createTweetElement(tweet))
  }
  return listTweets
}
 
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet) ; // to see what it looks like
$('#leTwitted').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



// $(function() {
  const $button = $('#post-twit');
  $button.on('click', function(event) {
    event.preventDefault();
    console.log('button clicked: ajax time');
    $.ajax('index.html', { method: 'GET'})
    .then(function(tweets) {
      console.log('Success: ', tweets);
      $('#leTwitted').append(tweets)
    })
  })
// })