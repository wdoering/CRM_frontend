angular.module('CRM.controllers').controller('ProductCtrl', function(ProductService, $scope, $http, $timeout, $ionicModal) {
  
  //context startup
  ProductService.getProducts().then(function(response){

    var products = response.data;
    console.log(response.data);
    $scope.products = products;

  });

  ProductService.getManufacturers().then(function(response){

    var manufacturers = response.data;
    console.log(response.data);
    $scope.manufacturers = manufacturers;

  });
  
  ProductService.getProductTypes().then(function(response){

    var productTypes = response.data;
    console.log(response.data);
    $scope.productTypes = productTypes;

  });

  ProductService.getProductSizeCategories().then(function(response){

    var productSizeCategories = response.data;
    console.log(response.data);
    $scope.productSizeCategories = productSizeCategories;

  });

  //end context startup
  
  //this is only so I can see the list working offline
  if(typeof $scope.products === 'undefined'){
    $scope.products  = ProductService.all();
  }

  //abre modal de novo produto
  $scope.newProduct = function(){
      $scope.product = {};
      $ionicModal.fromTemplateUrl('components/product/views/product-edit.html', {
        scope: $scope
      }).then(function(modal) {
        
        $scope.modal = modal; 
        $scope.modal.show();
      });
      
      $scope.closeProductAdd = function() {
        $scope.modal.hide();
      };

    };
    

  $scope.editproduct = function(productId){
    
     $ionicModal.fromTemplateUrl('components/product/views/product-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        var indexOfProduct = ProductService.fetchIndex($scope.products, productId);
        $scope.product = $scope.products[indexOfProduct]; 
        $scope.modal.show();
      });

      $scope.closeProductEdit = function() {
        $scope.modal.hide();
      };

        // salva novo produto via POST
      // $scope.productEditSave = function() {
      //   console.log('Saving Edit product', $scope.product);
      //   debugger;
      //   var res = ProductService.submitEditProduct(product);

      //   res.success(function(data, status, headers, config) {
      //     console.log('product PUT SUCCESS');
          
      //     $scope.closeProductEdit();

      //   });
      //   var indexOfProduct = ProductService.fetchIndex($scope.products, productId)
      //     $scope.products[indexOfProduct] = $scope.product; 
        
      //   res.error(function(data, status, headers, config) {
      //     console.log('product PUT FAIL');
      //   }); 

      // };

    };

      // salva novo produto via POST
      $scope.productSave = function() {
        console.log('Saving product', $scope.product);
        var data = $scope.product;

        var res;
        if(data.id) {
          var res = ProductService.submitEditProduct(data);
        }else {
          res = ProductService.submitNewProduct(data);
        }
         
        res.success(function(data, status, headers, config) {
          console.log('product Save SUCCESS');
          if(config.method === "PUT"){
            $scope.closeProductAdd();
          }
          
          else if(config.method === "POST"){
            $scope.product.id = data; 
            $scope.products.push($scope.product);
            $scope.closeProductAdd();

          }

        });

        res.error(function(data, status, headers, config) {
          console.log('product POST FAIL');
        });

        $scope.closeProductAdd = function() {
          $scope.modal.hide();
        };

      };
   

    $scope.deleteProduct = function(productId){
        console.log("delete este produto");
        
        var index = ProductService.fetchIndex($scope.products, productId);
        var res = ProductService.deleteProduct(productId);

        res.success(function(data, status, headers, config) {
          console.log('product DELETE  SUCCESS' + data);
          if(data === true)
            $scope.products.splice(index, 1);
        });
        res.error(function(data, status, headers, config) {
          console.log('product DELETE  FAIL');
        }); 

    };

  })
