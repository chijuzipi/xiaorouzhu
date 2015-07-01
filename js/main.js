Parse.initialize("cMob1z3wF1FNpAWlw4o4vbalOP2EAGEcEzmnK4PI", "3tLjw7zJ9KGPGLCeWKDEZXL3c3xWjp1dh7XWl05j");

$(document).ready(function(){
  
  var productObject = Parse.Object.extend("Product");
  var query = new Parse.Query(productObject);
  var url = window.location.pathname; 
  
  var cataArray = ['Handbag', 'Cloth', 'Cosmetics', 'Nutrition', 'Jewel', 'Baby', 'Other'];
  var dict = {};
  buildDict(dict);


  //console.log(url);
  var divid = url.split('/')
  var mark = divid[divid.length-1];
  
  if(mark != 'index.html' && mark != ''){
  //console.log(dict[mark]);
    query.equalTo("product_type", dict[mark]);
  }
  
  //limit the result returned from query
  //query.limit(4);

  query.find({
    success:function(results) {
      //console.log("Total: "+results.length);

      for (i = results.length-1; i >= 0; i--){
        //console.log("line12: "+ results[i].id);
        generateContent(results[i]);
      }
    },

    error:function(error) {
      console.log("failed to get object");
    }
  });

  $('.sub').click(function(){
    var cata = $(this).attr('id');

    for (i = 0; i < cataArray.length; i++){
      var id = '.' + cataArray[i];
      if(cataArray[i] == cata){
        $(id).show();
      }
      else{
        $(id).hide();
      }
    }

    generateDropdown(cata);
    
  });

  function generateDropdown(cata){
    var brandArray = dict[cata];
    var doc = "<select id='brandSelect'>"
    var brand = '';
    for (i = 0; i < brandArray.length; i++){
      brand = brandArray[i]; 
      doc += "<option value='" + brand + "'>" + brand + "</option>";
    }
    doc += "</select>";
         
  }

  function buildDict(dict){
    
    dict['Handbag']      = ['Handbag', '可爱包包', '所有', 'Coach', 'MK', 'Guess', '其他'];
    dict['Cloth']        = ['时尚衣服', '所有', 'Tommy', 'Carters', 'A&F', 'Levis', '其他'];
    dict['Jewel']        = ['可爱首饰', '所有', '其他'];
    dict['Nutrition']    = ['健康营养', '所有', 'GNC', 'MoveFree', '其他'];
    dict['Cosmetics']    = ['高级化妆', 'Lancome', 'Clinique', '其他'];
    dict['Baby']         = ['放心婴幼儿用品', '所有', '其他'];
    dict['Other']        = ['丰富多采'];
  }

  function generateContent(result){
      var name   = result.get('product_name');
      var price  = result.get('product_price'); 
      var desc   = result.get('product_desc'); 
      var type   = result.get('product_type'); 

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
      //console.log("line31 " + results[i].id);
      //console.log(link);

      var modalId = result.id;

      var doc = "<div class='col-sm-4 col-lg-4 col-md-4 " + type + 
                "'><div class='thumbnail'><img src='" + link + "'" +
                "alt='' data-toggle='modal' data-target='#"+ modalId + "'>" + 
                "<hr><div class='caption'><h4 class='pull-right'>¥: " + price + 
                "</h4><h4><a href='#' data-toggle='modal' data-target='#" + modalId + "'>" + name + 
                "</a></h4><p>" + desc + "</p>";

      var modal = 
            "<div class='modal fade' id='" + modalId + "' role='dialog'>" + 
            "<div class='modal-dialog'>" + 
            "<div class='modal-content'>" + 
            "<div class='modal-header'>"  + 
            "<button type='button' class='close' data-dismiss='modal'>&times;</button>" + 
            "<h4 class='modal-title'>" + name + "</h4>" + 
            "</div>" +
            "<div class='modal-body'>";

      for(j=0; j < linkArray.length-1; j++){
        modal += "<img src='"+ linkArray[j] + "' data-dismiss='modal'><hr>";
      }

      modal += 
        "<img src='"+ linkArray[j] + "' data-dismiss='modal'>" + 
        "</div>" + 
        "<div class='modal-footer'>" +
        "<button type='button' class='btn btn-default' data-dismiss='modal' style='height:50px; width:100%'>Close</button>" + 
        "</div>" +
        "</div>" + 
        "</div>" + 
        "</div>";

      $("#productS").append(doc);
      $("#modalContainer").append(modal);

    
  }


});




