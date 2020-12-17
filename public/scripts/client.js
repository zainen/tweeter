/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const listTweets = []


const createTweetElement = function (obj) {
  // const $tweet = $(`<article class="tweet">Hello world</article>`);
  // return $tweet
  console.log(obj.user.name)
    const twit = $(`
    <article>
    <header class="twit-Top">
    <b>
    <img src="${obj.user.avatars}"/>
    ${obj.user.name}
    </b>
    <b class="handle">${obj.user.handle}</b>
    </header>
    <p class="past-Twit">
    ${obj.content.text}
    </p>
    <footer class="twit-Bot">
    <p>
    ${obj.created_at}
    </p>
    
    </footer>
    </article>
    `)
    return twit
}
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#leTwitted').append(createTweetElement(tweet));
  }
}
const renderLastTweet = function (tweets) {
  const lastPost = tweets[tweets.length - 1]
  $('#leTwitted').append(createTweetElement(lastPost))
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

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#leTwitted').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


$(function() {
  const $button = $('.post-twit');
  $button.on('click', function(event) {
    event.preventDefault();
    console.log('button clicked: ajax time');
    const newTweet = $('form').serialize()
    $.ajax('/tweets', { method: 'POST', data: newTweet })
    .then(function(tweets) {
      console.log('Success: ', tweets);
      $('#leTwitted').append(tweets)
    })
  })
})

// $(function() {
//   const $button = $('#post-twit')
//   $.ajax('#leTwitted', { method: 'GET' })
//   .then(function (index) {
//     console.log(index)
//     // $('#leTwitted').append(listTweets)
//   })
// })
$(function() {
  console.log( "ready!" );
  $.get('/tweets', (data) => {
    renderTweets(data)
    // const $tweet = createTweetElement(tweetData);
    // $('#leTwitted').append($tweet);
  })
  // renderTweets([{"user":{"name":"Newton","avatars":"https://i.imgur.com/73hZDYK.png","handle":"@SirIsaac"},"content":{"text":"If I have seen further it is by standing on the shoulders of giants"},"created_at":1607986242409},{"user":{"name":"Descartes","avatars":"https://i.imgur.com/nlhLi3I.png","handle":"@rd"},"content":{"text":"Je pense , donc je suis"},"created_at":1608072642409},{"user":{"name":"Augusta Huisman","handle":"@MissHuisman52","avatars":"https://i.imgur.com/z5LNkkB.png"},"content":{"text":"asdf"},"created_at":1608165285756},{"user":{"name":"Phoebe Fujimoto","handle":"@MrsFujimoto","avatars":"https://i.imgur.com/lRUnDgU.png"},"content":{"text":"asdf"},"created_at":1608165329521}])
  }); 

const loadTweets = function () {

}

$(function() {
  $('.post-twit').on('click', () => {
    $.get('/tweets', (data) => {
      console.log(data)
      renderLastTweet(data)
    })
  })
})