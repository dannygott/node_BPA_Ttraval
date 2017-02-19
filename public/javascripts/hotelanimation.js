function hotelinfo(dest, fade) {
  if (fade == true) {
    $(".hotelBox").stop().fadeOut( 'slow', function(){
    });
    $(".hotelInfo" + dest).stop().fadeIn( 'slow', function(){
    });
  }else {
    $(".hotelBox").stop().fadeIn( 'slow', function(){
    });
    $(".hotelInfo" + dest).stop().fadeOut( 'slow', function(){
    });
  }
}
