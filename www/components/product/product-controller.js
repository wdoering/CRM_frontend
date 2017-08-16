angular.module('CRM.controllers').controller('ProductCtrl', function (ProductService, $scope, $http, $timeout, $ionicModal) {
    //#region
    //context startup
    //this is only so I can see the list working offline
    ProductService.getProducts().then(function (response) {
        var products = response.data;
        $scope.products = products;
    });
    if (typeof $scope.products === 'undefined') {
        $scope.products = ProductService.all();
    }
    ProductService.getManufacturers().then(function (response) {
        var manufacturers = response.data;
        $scope.manufacturers = manufacturers;
    });
    ProductService.getProductTypes().then(function (response) {
        var productTypes = response.data;
        $scope.productTypes = productTypes;
    });
    if (!$scope.manufacturers) {
        $scope.manufacturers = [{ "id": 1, "name": "campeiro" }, { "id": 2, "name": "Strassburger" }, { "id": 3, "name": "Sete Léguas" }]
    }
    if (!$scope.productTypes) {
        $scope.productTypes = [{ "id": 1, "description": "calçado" }, { "id": 2, "description": "camisa" }, { "id": 3, "description": "calça" }];
    }
    if (!$scope.productSizeCategories) {
        $scope.productSizeCategories = [{ "id": 1, "description": "Botas masculinas" }, { "id": 2, "description": "Botas femininas" }, { "id": 3, "description": "Camisas masculinas" }, { "id": 4, "description": "Camisas femininas" }, { "id": 5, "description": "Alpargatas masculinas" }, { "id": 6, "description": "Alpargatas femininas" }];
    }

    ProductService.getProductSizeCategories().then(function (response) {
        var productSizeCategories = response.data;
        $scope.productSizeCategories = productSizeCategories;
    });
    //#endregion

    $scope.newProduct = function () {
        $scope.product = {};
        $ionicModal.fromTemplateUrl('components/product/views/product-edit.html', {
            scope: $scope
        }).then(function (modal) {

            $scope.modal = modal;
            $scope.modal.show();
        });
        $scope.closeProductAdd = function () {
            $scope.modal.hide();
        };

    };

    $scope.editProduct = function (productId) {

        $ionicModal.fromTemplateUrl('components/product/views/product-edit.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
            var indexOfProduct = ProductService.fetchIndex($scope.products, productId);
            $scope.product = $scope.products[indexOfProduct];
            $scope.modal.show();
        });

        $scope.closeProductEdit = function () {
            $scope.modal.hide();
        };

    };

    $scope.productSave = function () {
        var data = $scope.product;

        var res;
        if (data.id) {
            var res = ProductService.submitEditProduct(data);
        } else {
            res = ProductService.submitNewProduct(data);
        }

        res.success(function (data, status, headers, config) {
            if (config.method === "PUT") {
                $scope.closeProductAdd();
            } else if (config.method === "POST") {
                //adicionar logica do toast aqui
                // sefodeu! soh tem no ionic 2 HAHA
                //I need a new project.... gotta finish my shit
                $scope.product.id = data;
                $scope.products.push($scope.product);
                $scope.closeProductAdd();
            }
        });

        res.error(function (data, status, headers, config) {
            console.log('product POST FAIL');
        });
        $scope.closeProductAdd = function () {
            $scope.modal.hide();
        };

    };


    $scope.deleteProduct = function (productId) {

        var index = ProductService.fetchIndex($scope.products, productId);
        var res = ProductService.deleteProduct(productId);

        res.success(function (data, status, headers, config) {
            if (status === 200)
                $scope.products.splice(index, 1);
        });
        res.error(function (data, status, headers, config) {
            console.log('product DELETE  FAIL');
        });

    };

})
