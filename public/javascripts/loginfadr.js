function fadetologin(selector) {
  if (selector == true) {
    $(".login").fadeIn( 'slow', function(){
      console.log("bool");
    });
  }else {
    $(".login").fadeOut( 'slow', function(){
      console.log("bool");
    });
  }

}
