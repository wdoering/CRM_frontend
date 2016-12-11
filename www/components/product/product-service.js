angular.module('CRM').service('ProductService', function ($http, SERVER_URL, MANUFACTURER_CTRL, PRODUCT_CTRL, PRODUCT_TYPE_CTRL, PRODUCT_SIZE_CATEGORY_CTRL) {
    var urlProduct = "/product";
    return {
        all: function () {
            return [{ id: 1, description: 'product 1 STATIC' }, { id: 2, description: 'product 2 STATIC' }, { id: 3, description: 'product 3 STATIC' }];
        },

        getProducts: function () {
            return $http.get(SERVER_URL + PRODUCT_CTRL);
        },

        submitNewProduct: function (productData) {
            return $http.post(SERVER_URL + PRODUCT_CTRL, productData);
        },

        deleteProduct: function (productId) {
            return $http.delete(SERVER_URL + PRODUCT_CTRL + "?id=" + productId);
        },
        submitEditProduct: function (product) {
            return $http.put(SERVER_URL + PRODUCT_CTRL, product);
        },

        //this function should be moved to a generic class file...
        fetchIndex: function (objList, productId) {
            var indexofObject = -1;
            angular.forEach(objList, function (product) {

                if (productId === product.id) {
                    indexofObject = objList.indexOf(product);
                }

            });
            return indexofObject;
        },

        getManufacturers: function () {
            return $http.get(SERVER_URL + MANUFACTURER_CTRL);
        },
        getProductTypes: function () {
            return $http.get(SERVER_URL + PRODUCT_TYPE_CTRL);
        },
        getProductSizeCategories: function () {
            return $http.get(SERVER_URL + PRODUCT_SIZE_CATEGORY_CTRL);
        }


    }

})