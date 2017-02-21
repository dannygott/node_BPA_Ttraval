var lastentry = ""; // var containing last entry in form
$(".search").keyup(function(event) { // detect change in search form entry
   if($('.search').val() != lastentry) { // filter old entries
     $(".destbox").stop().fadeOut( 'slow', function(){}); // fade out all destinations
     $( ".destButton" ).each(function( index ) { // filter all destinations on page for ones matching search
        var searchfor = $('.search').val().toUpperCase();  // uppercase conversion
       if ($(this).text().toUpperCase().includes(searchfor) == true){ // if the destination matches the searchterm fade its parents parents parent in
         $(this).parent().parent().parent().stop().fadeIn( 'fast', function(){
         });
       }
     });
   }
   lastentry = $('.search').val()
});
 // .stop is added to keep jquery stuff from queing
