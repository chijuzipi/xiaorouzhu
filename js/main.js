Parse.initialize("cMob1z3wF1FNpAWlw4o4vbalOP2EAGEcEzmnK4PI", "3tLjw7zJ9KGPGLCeWKDEZXL3c3xWjp1dh7XWl05j");

$(document).ready(function(){
  
  var productObject = Parse.Object.extend("Product");
  var query = new Parse.Query(productObject);
  var url = window.location.pathname; 

  var dict = {};
  dict["bag.html"] = "Handbag";
  dict["jew.html"] = "Jewel";
  dict["nut.html"] = "Nutrition";
  dict["cos.html"] = "Cosmetics";
  dict["baby.html"] = "Baby";
  dict["clo.html"] = "Cloth";
  dict["oth.html"] = "Other";

  //console.log(url);
  var divid = url.split('/')
  var mark = divid[divid.length-1];
  
  if(mark != 'index.html' && mark != ''){
  //console.log(dict[mark]);
    query.equalTo("product_type", dict[mark]);
  }

  query.find({
    success:function(results) {
      //console.log("Total: "+results.length);

      for (i = 0; i < results.length; i++){
        console.log("line12: "+ results[i].id);
        var name   = results[i].get('product_name');
        var price  = results[i].get('product_price'); 
        var desc   = results[i].get('product_desc'); 
        var type   = results[i].get('product_type'); 

        var init = 0;
        var linkArray  = [];
        var imageName = 'image_'+init;
        var image = results[i].get(imageName);

        while(image!=null && image!=undefined){
          linkArray.push(image.url());
          init++;
          imageName = 'image_'+init;
          image = results[i].get(imageName);
        }

        var link   = linkArray[0];
        console.log("line31 " + results[i].id);
        console.log(link);

        var modalId = results[i].id;

        var doc = "<div class='col-sm-4 col-lg-4 col-md-4'><div class='thumbnail'><img src='" + link + "'" +
                  "alt='' data-toggle='modal' data-target='#"+ modalId + "'>" + 
                  "<hr><div class='caption'><h4 class='pull-right'>¥: " + price + 
                  "</h4><h4><a href='#' data-toggle='modal' data-target='#" + modalId + "'>" + name + 
                  "</a></h4><p>" + desc + 
                  "</p>";

        var modal = 
              "<div class='modal fade' id='" + modalId + "' role='dialog'>" + 
              "<div class='modal-dialog'>" + 
              "<div class='modal-content'>" + 
              "<div class='modal-header'>"  + 
              "<button type='button' class='close' data-dismiss='modal'>&times;</button>" + 
              "<h4 class='modal-title'>" + name + "</h4>" + 
              "</div>" +
              "<div class='modal-body'>";

        for(j=0; j < linkArray.length; j++){
          modal += "<img src='"+ linkArray[j] + "'><hr>";
        }

        modal += 
          "</div>" + 
          "<div class='modal-footer'>" +
          "<h4 class='modal-title'>¥: " + price + "</h4>" + 
          "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" + 
          "</div>" +
          "</div>" + 
          "</div>" + 
          "</div>";

        $("#productS").append(doc);
        $("#modalContainer").append(modal);

      }
    },

    error:function(error) {
      console.log("failed to get object");
    }
  });

});




