const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {

  const sortedTweets = tweets.sort(function(a, b){ 
    return a.created_at - b.created_at;
  });
  let tweetContainer = $('.tweet-container');
  tweetContainer.empty();
  for (const tweet of sortedTweets) {
    let tweetElement = createTweetElement(tweet);
    tweetContainer.prepend(tweetElement);
  }
};

const createTweetElement = function(tweet) {
  const realName = tweet.user.name;
  const userName = tweet.user.handle;
  const avatar = tweet.user.avatars;
  const text = tweet.content.text;
  const msecond = tweet.created_at;
  const days = whenLeaveMessage(msecond);
 
  let html = `<div class="ind">
         <header>
            <ul>
              <div class="inside-tweetcontainer">
                <li><img class="portrait" src="${avatar}"></li> 
                <li class="reallname">${realName}</li>
            </div>
              <li class="username">${userName}</li>
            </ul>
          </header>
          <article>
              <div name="text" class="message">${escape(text)}</div>
            <hr/>
          </article> 
          <footer>
            <ul>
              <li class="days">${days}</li>
              <div class="flag">
                <li><i class="fab fa-gratipay"></i></li>
                <li><i class="fas fa-retweet"></i></li>
                <li><i class="fas fa-flag"></i></li>
              </div>
            </ul>
          </footer>
          </div>
`;

  let tweetElement = html;
  return tweetElement;
};
const whenLeaveMessage = function(msecond) {
  let d = new Date();
  let n = d.getTime();
  const day = Math.floor((n - msecond) / 86400000);
  if (day > 1) {
    return day + " days";
  } else if (day === 1) {
    return day + " day";
  } else {
    return "Today";
  }
};

$( document ).ready(function() {
  const loadtweets = function() {
    $.getJSON(`/tweets`)
      .then((tweets) => {
        renderTweets(tweets);
      });
  };
    

  $('#new-tweet').on('submit', function(event) {
    event.preventDefault();
    if ($(".tweet-text").val().length === 0) {
      $(".firstdiv").slideDown("slow");
      $(".firstdiv").text("(>_<) No Comment!");
    } else if ($(".tweet-text").val().length > 140) {
      $(".firstdiv").slideDown("slow");
      $(".firstdiv").text("(>人<)Longer Than 140 charactor!");
      return;
    } else {
      $(".firstdiv").hide();
    }

    const serialized = $(this).serialize();
    console.log('serialized', serialized);
    $.post('/tweets', serialized)
      .then(() => {
        loadtweets();
        $(".tweet-text").val("");
        $(".counter").val(140);
      });
  });
  loadtweets();
});

