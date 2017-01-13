angular.module('CRM').service('ProductService', function ($http, SERVER_URL, MANUFACTURER_CTRL, PRODUCT_CTRL, PRODUCT_TYPE_CTRL, PRODUCT_SIZE_CATEGORY_CTRL) {
    var urlProduct = "/product";
    return {
        all: function () {
            return [{ id: 1, description: 'product 1 STATIC', productSizeCategory: { "id": 2, "description": "Botas femininas" }, manufacturer: { "id": 1, "name": "campeiro" }, productType: { "id": 1, "description": "calçado" } },
            { id: 2, description: 'product 2 STATIC', productSizeCategory: { "id": 2, "description": "Botas femininas" }, manufacturer: { "id": 1, "name": "campeiro" }, productType: { "id": 1, "description": "calçado" } },
            { id: 3, description: 'product 3 STATIC', productSizeCategory: { "id": 2, "description": "Botas femininas" }, manufacturer: { "id": 1, "name": "campeiro" }, productType: { "id": 1, "description": "calçado" } }];
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