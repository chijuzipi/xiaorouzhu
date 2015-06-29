Parse.initialize("cMob1z3wF1FNpAWlw4o4vbalOP2EAGEcEzmnK4PI", "3tLjw7zJ9KGPGLCeWKDEZXL3c3xWjp1dh7XWl05j");

$(document).ready(function(){

  $( "#save" ).click(function() {
    console.log("upload clicked");

    var fileuploadcontrol = $("#imageUpload")[0];
    if (fileuploadcontrol.files.length > 0) {
      var file = fileuploadcontrol.files[0];
      var name = "photo.jpg";
      var parsefile = new Parse.File(name, file);
    }

    var productName = $("#productName").val();
    var productPrice = $("#productPrice").val();

    parsefile.save().then(function() {
    // the file has been saved to parse.
      console.log("save successfully");
      var product = new Parse.Object("Bag")
      product.set("product_name", productName);
      product.set("product_price", productPrice);
      product.set("image", parsefile);
      product.save();

      }, function(error) {
        console.log("save falied");
    });
  });
});
