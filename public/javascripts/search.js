var lastentry = "";

$(".search").keyup(function(event) {
   if($('.search').val() != lastentry) {
     $(".destbox").fadeOut( 'slow', function(){
     });
     console.log("I WORK");
     $( ".destButton" ).each(function( index ) {
        var searchfor = $('.search').val()
        console.log(searchfor);
       if ($(this).text().includes(searchfor) == true){
         console.log("I tried");
         $(this).parent().parent().parent().fadeIn( 'slow', function(){
         });
       }
     });
   }
   lastentry = $('.search').val()
});
