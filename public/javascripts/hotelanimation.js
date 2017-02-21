
// controls the fading for the hotel Information
// not very modular but it works

function hotelinfo(dest, fade) {
  if (fade == true) {
    $(".hotelBox").stop().fadeOut( 'slow', function(){
    });
    $(".hotelInfo" + dest).stop().fadeIn( 'slow', function(){
    });
  }else {
    $(".hotelBox").stop().fadeIn( 'slow', function(){
    });
    $(".hotelInfo").stop().fadeOut( 'slow', function(){
    });
  }
}
