
     $(".destbox").stop().fadeOut( 'slow', function(){
     });
     $( ".destButton" ).each(function( index ) {
        var searchfor = $('.search').val().toUpperCase();
        console.log(searchfor);
       if ($(this).text().toUpperCase().includes(searchfor) == true){
         $(this).parent().parent().parent().stop().fadeIn( 'fast', function(){
         });
       }
     });
