'use strict';

// TODO: split out the controllers and services

angular.module('app', []);



// Services
angular.module('app')
    .service('productService', productService);

function productService($http, $q) {
    this.getProducts = function(cb) {
        $http.get('/api/products').then(cb);
    };

    this.saveProducts = function(products) {
        var queue = [];

        products.forEach(function(product) {
            var request;

            if (!product._id) {
                request = $http.post('/api/products', product);
            } else {
                request = $http.put('/api/products/' + product._id, product).then(function(result) {
                    product = result.data.product;
                    return product;
                });
            }

            queue.push(request);
        });

        return $q.all(queue).then(function(results) {
            console.log("I save " + products.length + " products!");
        });
    };
}



// Controllers
angular.module('app')
    .controller('productController', productController);

function productController($scope, productService) {
    $scope.title = "Products";

    productService.getProducts(function(res) {
        $scope.products = res.data.products;
    });

    $scope.addProduct = function(name, price) {
        $scope.products.unshift({
            'name': name,
            'price': price
        });
        $scope.name = '';
    };

    $scope.saveProducts = function() {
        productService.saveProducts($scope.products);
    };
}