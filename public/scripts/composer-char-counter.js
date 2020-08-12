
$(document).ready(function() {
  // --- our code goes here ---
   console.log("load success")
   $('.tweet-text').keyup(function(e) {
     let charactorCount = $(this).val().length;
     $('.counter').text(140 - charactorCount);

     if($('.counter').text() < 0) {
       $(".counter").addClass("red");
     } else {
       $(".counter").removeClass("red");
    } 
  })  
});


