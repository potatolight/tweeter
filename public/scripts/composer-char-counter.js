
$(document).ready(function() {
  $('.tweet-text').keyup(function() {
    let charactorCount = $(this).val().length;
    $('.counter').text(140 - charactorCount);
    if ($('.counter').text() < 0) {
      $(".counter").addClass("red");
    } else {
      $(".counter").removeClass("red");
    }
  });
});


