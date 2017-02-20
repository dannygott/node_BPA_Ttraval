var lastentry = "";
$(".search").keyup(function(event) {
   if($('.search').val() != lastentry) {
     $(".destbox").stop().fadeOut( 'slow', function(){});
     $( ".destButton" ).each(function( index ) {
        var searchfor = $('.search').val().toUpperCase();
       if ($(this).text().toUpperCase().includes(searchfor) == true){
         $(this).parent().parent().parent().stop().fadeIn( 'fast', function(){
         });
       }
     });
   }
   lastentry = $('.search').val()
});
