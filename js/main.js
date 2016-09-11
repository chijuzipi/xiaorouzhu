AV.initialize("81s57z30iss714rpsvmgm3rsuxiha4imqz7adqtozc9iyzhr", "4nrfo1hcwq6omwxa3maod5fmvwoc1gk3ogfh7ro9ookvdexh");
//Parse.initialize("cMob1z3wF1FNpAWlw4o4vbalOP2EAGEcEzmnK4PI", "3tLjw7zJ9KGPGLCeWKDEZXL3c3xWjp1dh7XWl05j");

$(document).ready(function(){
  
  var productObject = AV.Object.extend("Product");
  var query = new AV.Query(productObject);

  query.limit(1);

  query.find({
    success:function(results) {
        generateContent(results, function(){
          $('#productS').show(); 
          $('#productS').scrollView();

        });
    },

    error:function(error) {
      console.log("failed to get object");
    }
  });
  


  function generateContent(results, _callback){
    //for (i = results.length-1; i >= 0; i--){
    for (i = 0; i < results.length; i++){
      result = results[i];
      var name   = result.get('product_name');
      var price  = result.get('product_price'); 
      var desc   = result.get('product_desc'); 
      var type   = result.get('product_type'); 
      var brand  = result.get('product_brand'); 
      var date   = result.createdAt;
      var time   = date.toString();
    
      time = time.substring(4, 15);
      //console.log(date.substring(4, 14));
      var init = 0;
      var linkArray  = [];
      var imageName = 'image_'+init;
      var image = result.get(imageName);

      while(image!=null && image!=undefined){
        linkArray.push(image.url());
        init++;
        imageName = 'image_'+init;
        image = result.get(imageName);
      }

      var link   = linkArray[0];
      var modalId = result.id;
      var doc = "<div class='col-sm-4 col-lg-4 col-md-4 " + type + " " + brand + 
                "'><div class='thumbnail'><img src='" + link + "'" +
                "'>";

      $("#productS").append(doc);
    }

    _callback();
  }
    
  $.fn.scrollView = function () {
    return this.each(function () {
    $('html, body').animate({
    scrollTop: $(this).offset().top
    }, 1000);
    });
  }

});
