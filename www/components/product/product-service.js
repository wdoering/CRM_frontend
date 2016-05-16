angular.module('CRM').service('ProductService', function($http, SERVER_URL){
  var urlProduct = "/product";
  return {
      all: function(){
        return [{id:1, description:'product 1 STATIC'},{id:2, description:'product 2 STATIC'},{id:3, description:'product 3 STATIC'}];
      },
      
      getProducts: function(){
          console.log(SERVER_URL);
        return $http.get(SERVER_URL + urlProduct);
      },

      submitNewProduct : function(productData){
        return $http.post(SERVER_URL + urlProduct, productData);
      },

      deleteProduct : function(productId){
        return $http.delete(SERVER_URL + urlProduct + "?id=" + productId); 
      },
      submitEditProduct : function(product){
        return $http.put(SERVER_URL + urlProduct, product);
      },
       
      //this function should be moved to a generic class file...
      fetchIndex : function (objList,productId) {
        var indexofObject = -1;
        angular.forEach(objList, function(product) {
             
             if(productId === product.id){
                console.log(objList.indexOf(product));
                indexofObject = objList.indexOf(product);
             }
             
        });
        return indexofObject;
      },
      
      getManufacturers: function(){
        return $http.get(SERVER_URL + "/manufacturer");
          
      }


  }

})