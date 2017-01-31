function fadetologin(selector) {
  if (selector == true) {
    $(".login").fadeIn( 'slow', function(){
      console.log("bool");
    });
  }else {
    if (checkhover() != "INPUT" && checkhover() != "FORM") {
      console.log(checkhover());
      $(".login").fadeOut( 'slow', function(){
        console.log("bool");
      });
    }

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
