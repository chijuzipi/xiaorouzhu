Parse.initialize("cMob1z3wF1FNpAWlw4o4vbalOP2EAGEcEzmnK4PI", "3tLjw7zJ9KGPGLCeWKDEZXL3c3xWjp1dh7XWl05j");

$(document).ready(function(){
  
  var productObject = Parse.Object.extend("Product");
  var query = new Parse.Query(productObject);
  var url = window.location.pathname; 
  
  var cataArray   = ['Handbag', 'Cloth', 'Cosmetics', 'Nutrition', 'Jewel', 'Baby', 'Other'];
  var brandArray  = ['Kate_Spade', 'Tommy', 'MK', 'Carters', 'MoveFree', 'Lancome', 'Coach', 'MMJ', 'Other'];
  var dict = {};
  buildDict(dict);


  //console.log(url);
  var divid = url.split('/')
  var mark = divid[divid.length-1];
  
  if(mark != 'index.html' && mark != ''){
  //console.log(dict[mark]);
    query.equalTo("product_type", dict[mark]);
  }

  query.ascending("createdAt");
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
  
  //handle subcatagory click including Handbag, Baby, Jewel etc.
  $('.sub').click(function(){
    var cata = $(this).attr('id');
    var noContent = true;

    for (i = 0; i < cataArray.length; i++){
      var id = '.' + cataArray[i];
      if(cataArray[i] == cata){
        $(id).show();
        if($(id).length != 0)
          noContent = false;
      }
      else{
        $(id).hide();
      }
    }

    if (noContent){
      generateNoContent();
    }

    generateNavi(cata);

    
    var docPart = "<a href='#'>" + dict[cata][0] + "</a>" + 
                  "<a href='index.html' style='color:grey;margin-left:30px;opacity:0.7;font-size:0.8em;'>返回圈</a>";
        $('.navbar-brand').html(docPart);
    
  });

  /*
  function generateNoContent(){
    alert("对不起，还没货呦~");
  }
  */

  //handle brand click.
  $('.navbar').on('click', '.navi_brand', function () { 
    console.log("brand clicked");
    var brand = $(this).attr('id');
    var noContent = true;

    for (i = 0; i < brandArray.length; i++){
      var id = '.' + brandArray[i];
      if(brandArray[i] == brand ){
        $(id).show();
        if($(id).length != 0)
          noContent = false;
      }
      else if (brand != 'all'){
        $(id).hide();
      }
    }

    if(noContent) generateNoContent();

  });

  function generateNavi(cata){
    dictTemp = {};
    console.log("try to generate navi");
    var brandArray = dict[cata];
    var nav_brand_doc = '';
    for (j = 1; j < brandArray.length; j++){
      brand = brandArray[j]; 
      dictTemp[brand] = brand;
      dictTemp['all'] = '所有品牌';
      dictTemp['other'] = '其他品牌';
      if(brand == 'all') continue;
      nav_brand_doc += "<li><a href='#' class='navi_brand' id='" + brand + "'>" + dictTemp[brand] + "</a></li>";
    }

    $('.nav_sub').html(nav_brand_doc);
  }
  
  function buildDict(dict){
    
    dict['Handbag']      = ['可爱包包', 'all', 'Coach', 'MK', 'Guess', 'Kate_Spade', 'other'];
    dict['Cloth']        = ['时尚衣服', 'all', 'Tommy', 'Carters', 'A&F', 'Levis', 'other'];
    dict['Jewel']        = ['可爱首饰', 'all', 'other'];
    dict['Nutrition']    = ['健康营养', 'all', 'GNC', 'MoveFree', 'other'];
    dict['Cosmetics']    = ['高级化妆品', 'all', 'Lancome', 'Clinique', 'other'];
    dict['Baby']         = ['放心婴幼儿用品', 'all', 'other'];
    dict['Other']        = ['丰富多采'];
  }

  function generateContent(result){
      var name   = result.get('product_name');
      var price  = result.get('product_price'); 
      var desc   = result.get('product_desc'); 
      var type   = result.get('product_type'); 
      var brand  = result.get('product_brand'); 

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

      var doc = "<div class='col-sm-4 col-lg-4 col-md-4 " + type + " " + brand + 
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
    
  $(".navbar-nav li a").click(function(event) {
      $(".navbar-collapse").collapse('hide');
  });

  /* Nav bar auto collapse after selection
  $('.navbar').on('click', '.navbar-nav li a', function () { 
      $(".navbar-collapse").collapse('hide');
  });
  */

});




