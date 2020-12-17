// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

const escape =  function(str) {
  const inputSection = document.createElement('article');
  inputSection.appendChild(document.createTextNode(str));
  return inputSection.innerHTML;
}



const createTweetElement = function (obj) {
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
    ${escape(obj.content.text)}
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

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#leTwitted').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
const textEditor = (item) => {
  let newText = ''
  const newItem = item.split('%20')
  const spaces = newItem.length - 1
  for (const part of newItem) {
    if (part !== '') {
      newText += part
    }
  }
  if (newText.length + spaces <= 140 || newText.length > 0) {
    return true
  }
}

//form submit
$(function(){
$('#tweeter').submit(function(event) {
  event.preventDefault();
  const test = $('#tweeter').serialize()
  console.log(test)
  const slicedText = test.slice(5)
  const fixText = textEditor(slicedText)
  console.log(event)
  // if (textEditor(fixText)) {
    $.ajax({ url: 'http://localhost:8080/tweets',  
    method: 'POST', 
    data: $(this).serialize() })
    $.ajax({             
      method: "POST",             
      url: "/tweets/",             
      data: $(this).serialize() //turns form data into query string         
    }).then(function() {             
      loadTweets();             
      $('#tweet-text').val('');             
      console.log();         
    })

    // } else {
    //   alert('Cannot submit empty post or only spaces')
    //   }
    })
  })
      
// get db tweets
$(document).ready(function() {loadTweets()});

// functions
const loadTweets = function () {
  $.get('/tweets', function(tweets) {
    renderTweets(tweets)
  })
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#leTwitted').append(createTweetElement(tweet));
  }
}