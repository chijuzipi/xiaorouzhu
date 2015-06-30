Parse.initialize("cMob1z3wF1FNpAWlw4o4vbalOP2EAGEcEzmnK4PI", "3tLjw7zJ9KGPGLCeWKDEZXL3c3xWjp1dh7XWl05j");

$(document).ready(function(){
  
  var productObject = Parse.Object.extend("Product");
  var query = new Parse.Query(productObject);
  query.find({
    success:function(results) {
      console.log("Total: "+results.length);
      var nameArray  = [];
      var priceArray = [];
      var descArray  = [];
      var typeArray  = [];
      var linkArray  = [];

      for (i = 0; i < results.length; i++){
        var name   = results[i].get('product_name');
        var price  = results[i].get('product_price'); 
        var desc   = results[i].get('product_desc'); 
        var type   = results[i].get('product_type'); 
        var link   = results[i].get('image_0').url(); 
        var doc = "<div class='col-sm-4 col-lg-4 col-md-4'><div class='thumbnail'><img src='" + link + "'" +
                  "alt=''><div class='caption'><h4 class='pull-right'>¥" + price + 
                  "</h4><h4><a href='productPage.html'>" + name + 
                  "</a></h4><p>" + desc + 
                  "</p>";

        $("#productS").append(doc);
      }

    },
    error:function(error) {
      console.log("failed to get object");
    }
  });
  /*
  var doc = "<div class='col-sm-4 col-lg-4 col-md-4'><div class='thumbnail'><img src='http://placehold.it/320x150" + 
            "alt=''><div class='caption'><h4 class='pull-right'>¥84.99</h4><h4><a href='#'>Fourth Product</a></h4><p>DESC.</p>"

  $("#productS").append(doc);
  */
});




