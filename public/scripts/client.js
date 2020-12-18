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
  const postDate = obj.created_at;
  const timePosted = Date.now();
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
    ${Math.ceil((timePosted - postDate) / 1000 / 3600 / 24)} day(s) ago
    </p>
    </footer>
    </article>
    `)
    return twit;
}

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#leTwitted').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// const textEditor = (item) => {
//   let newText = '';;
//   let count;
//   const newItem = item.split('%20');
//   console.log(decodeURI(item))
//   const spaces = newItem.length - 1;
//   for (const part of newItem) {
//     if (part !== '') {
//       newText += part;
//     }
//   }
//   if (newText.length > 0) {
//     count = newText.length + spaces;
//   } else {
//     return false;
//   }
//   if (count > 0 && count <= 140) {
//     return true;
//   } else {
//     return false;
//   }
// }
const textEditor = (item) => {
  const decoded = decodeURI(item)
  const count = decoded.length
  return (count > 0 && count <= 140 && decoded.trim().length > 0) 
}


//form submit
$(function(){
$('#tweeter').submit(function(event) {
  event.preventDefault();
  const test = $('#tweeter').serialize();
  const slicedText = test.slice(5);
  const fixText = textEditor(slicedText);
  if (fixText) {
    $('.errMsg').slideUp()
    $.ajax({             
      method: "POST",             
      url: "/tweets/",             
      data: $(this).serialize() //turns form data into query string         
    })
    .then(function() {             
      loadTweets();        
      $('#tweet-text').val('');// clear box after successful post         
    })
  } else {
    $('.errMsg').slideDown();
    $('#tweet-text').val('') // clear box after error
    // alert('Cannot submit empty post or only spaces')
    }
  })
})

$(function() {
  $('.initiator').on('click', function(event) {
    $('.errMsg').slideUp()
    $('.new-tweet').slideDown()
    $('#tweet-text').focus()
  })
  $('.return').on('click', function(event) {
    window.scrollTo(0, 0)
  })
})

      
// get db tweets
$(document).ready(function() {loadTweets()});

// functions
const loadTweets = function () {
  $.get('/tweets', function(tweets) {
    renderTweets(tweets);
  })
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#leTwitted').append(createTweetElement(tweet));
  }
}
