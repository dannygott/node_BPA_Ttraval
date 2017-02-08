function fadetologin(selector) {
  if (selector == true) {
    $(".login").fadeIn( 'slow', function(){
    });
  }else {
    if (checkhover() != "INPUT" && checkhover() != "FORM" && checkhover() != "BUTTON" && checkhover() != "A") {
      $(".login").fadeOut( 'slow', function(){
      });
    }
  }
}

function register(selector) {
  if (selector == true) {
    $(".loginform").fadeOut( 'slow', function(){
      $(".register").fadeIn( 'slow', function(){
      });
    });
  }else {
      $(".register").fadeOut( 'slow', function(){
        $(".loginform").fadeIn( 'slow', function(){
        });
      });
  }
}
function checkhover(){
 var element = $(':hover');
    if(element.length)
    {
        var domElement = element[element.length - 1];
        var tagName = domElement.tagName;
        return tagName
    }
  }
