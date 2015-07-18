//AV.initialize("81s57z30iss714rpsvmgm3rsuxiha4imqz7adqtozc9iyzhr", "4nrfo1hcwq6omwxa3maod5fmvwoc1gk3ogfh7ro9ookvdexh");
Parse.initialize("cMob1z3wF1FNpAWlw4o4vbalOP2EAGEcEzmnK4PI", "3tLjw7zJ9KGPGLCeWKDEZXL3c3xWjp1dh7XWl05j");

$(document).ready(function(){
  
  var productObject = Parse.Object.extend("Product");
  var query = new Parse.Query(productObject);
  var url = window.location.pathname; 
  
  var cataArray   = ['Bag', 'Handbag', 'Cloth', 'Cosmetics', 'Nutrition', 'Jewel', 'Baby', 'Other'];
  var brandArray  = ['Coach', 'MMJ', 'MK', 'Rebecca_Minkoff', 'Kate_Spade', 'wallet', 'Tommy', 'CK', 'A_F', 'Levis', 'Carters','US_POLO_ASSN', 'shoe', 'Swarovski', 'Juicy_Couture','other', 'GNC', 'MoveFree', 'Puritans_Pride', 'Lancome', 'Clinique', 'Esteem_Lauder', 'Kiehls','Origins', 'baby_healthy', 'baby_feeding', 'baby_daily','other'];

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

      //for (i = results.length-1; i >= 0; i--){
        //console.log("line12: "+ results[i].id);
        generateContent(results, function(){
          $(".price").click(function(event){
            var price = $(this).attr('value');
            var docPart = "<p id='bubble'>" + price + "</p>";
            $('.bubble').html(docPart);
            $('.bubble').fadeIn();
          });
        });

      //}
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

    /*    
    var docPart = "<p>" + dict[cata][0] + "~</p>";
        $('#bubble').html(docPart);
    */
    
  });

  function generateNoContent(){
    console.log("对不起，还没货呦~");
  }

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

    buildBrandNameDict(dictTemp);

    for (j = 1; j < brandArray.length; j++){
      brand = brandArray[j]; 
      if(brand == 'all') continue;
      nav_brand_doc += "<li><a href='#' class='navi_brand' id='" + brand + "'>" + dictTemp[brand] + "</a></li>";
    }

    $('.nav_sub').html(nav_brand_doc);
  }

  function buildBrandNameDict(dictTemp){
    for (j = 0; j < brandArray.length; j++){
      brand = brandArray[j]; 
      dictTemp[brand] = brand;
    }

    dictTemp['all']       = '所有品牌';
    dictTemp['other']     = '其他';
    dictTemp['wallet']    = '钱包';
    dictTemp['A_F']       = 'A&F';
    dictTemp['shoe']      = '鞋子';
    dictTemp['baby_healthy']   = '婴儿保健';
    dictTemp['baby_feeding']   = '婴儿饮食';
    dictTemp['baby_daily']     = '婴儿日用';
    
  }
  
  function buildDict(dict){

    dict['Handbag']      = ['钱包', 'all', 'Coach', 'MK', 'Rebecca_Minkoff', 'Kate_Spade', 'MMJ', 'wallet', 'other'];
    dict['Bag']          = ['包包', 'all', 'Coach', 'MK', 'Rebecca_Minkoff', 'Kate_Spade', 'MMJ', 'wallet', 'other'];
    dict['Cloth']        = ['衣类相关', 'all', 'Tommy', 'CK', 'A_F', 'Levis', 'Carters', 'US_POLO_ASSN', 'shoe','other'];
    dict['Jewel']        = ['首饰', 'all', 'Swarovski', 'Juicy_Couture','other'];
    dict['Nutrition']    = ['保健品', 'all', 'GNC', 'MoveFree', 'Puritans_Pride','other'];
    dict['Cosmetics']    = ['化妆品', 'all', 'Lancome', 'Clinique', 'Esteem_Lauder', 'Kiehls','Origins','other'];
    dict['Baby']         = ['婴幼儿', 'all', 'baby_healthy', 'baby_feeding', 'baby_daily','other'];
    
  }

  function generateContent(results, _callback){
    for (i = results.length-1; i >= 0; i--){
      result = results[i];
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
      var modalId = result.id;
      var doc = "<div class='col-sm-4 col-lg-4 col-md-4 " + type + " " + brand + 
                "'><div class='thumbnail'><img src='" + link + "'" +
                "alt='' data-toggle='modal' data-target='#"+ modalId + "'>" + 
                //"<hr><div class='caption'><h4 class='pull-right'>¥: " + price + 
                "<hr><div class='caption'>" + 
                "<h4><a href='#' data-toggle='modal' data-target='#" + modalId + "'>" + name + "</a></h4>" + 
                "<button type='button' class='btn btn-default price' value=" + price + " style='display:block'>" + 
                "<span class='glyphicon glyphicon-piggy-bank' aria-hidden='true'></span>" + 
                "&nbsp&nbsp问价格</button>" + 
                "<p style='line-height: 30px; width: auto;'>" + desc + "</p>";

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
        "<button type='button' class='btn btn-default' data-dismiss='modal' style='height:50px; width:100%'>关闭</button>" + 
        "</div>" +
        "</div>" + 
        "</div>" + 
        "</div>";

      $("#productS").append(doc);
      $("#modalContainer").append(modal);
    }

    _callback();
  }
    
  $(".sub").click(function(event) {
    $(".navbar-collapse").collapse('hide');
    $('#logo').attr('src', "resources/piggy_round15.png");
  });

  $("#logoB").click(function(event) {
    var logoEle = $('#logo');
    if(logoEle.attr('src') == 'resources/piggy_round15.png')
      logoEle.attr('src', "resources/piggy_round1.png");
    else
      logoEle.attr('src', "resources/piggy_round15.png");
  });

  $(window).scroll(function (event) {
    $('.bubble').fadeOut();
  });
    /*
    var scroll = $(window).scrollTop();
    var total  = $(document).height();
    if (scroll > 10){
    }
    else{
      $('#bubble').attr('style', 'display:show');
    }
      
  });
    */

});




