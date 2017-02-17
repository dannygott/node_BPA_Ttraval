var lastentry = "";

$(".search").keyup(function(event) {
   if($('.search').val() != lastentry) {
     $(".destbox").stop().fadeOut( 'slow', function(){
     });
     console.log("I WORK");
     $( ".destButton" ).each(function( index ) {
        var searchfor = $('.search').val().toUpperCase();
        console.log(searchfor);
       if ($(this).text().toUpperCase().includes(searchfor) == true){
         console.log("I tried");
         $(this).parent().parent().parent().stop().fadeIn( 'fast', function(){
         });
       }
     });
   }
   lastentry = $('.search').val()
});
