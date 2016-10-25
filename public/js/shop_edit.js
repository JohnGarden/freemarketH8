var app = angular.module('shop.edit', ['mwl.confirm']);
app.controller('StoreDeleteController', function($scope) {
    $scope.submitForm = function(form) {
      document.getElementById('storeDeleteForm').submit()
    }
  });

app.controller('ProductEditorController', function($scope, $http, $window) {
  var ctrl = this;

  $scope.roundPrice = function(product) {
    if (product.price) {
      product.price = Math.round(product.price * 100) / 100;
    }
  }

  $scope.newProduct = function() {
    $scope.products.push({available: true});
  }

  $scope.removeProduct = function(product) {
    $scope.products.splice($scope.products.indexOf(product), 1);
  }

  $scope.submitProducts = function(product) {
    if (ctrl.products_form.$invalid) {
      alert("Produtos inválidos! Conserte os erros e tente novamente.");
      return;
    }
    $http.post('/shop/' + $scope.shopId + '/products',
               {products: angular.copy($scope.products)})
        .then(function(res) {
          if (res.data.success) {
            $window.location.href = '/shop/' + $scope.shopId;
          } else {
            alert(res.data.error || "Erro desconhecido!");
          }
        }, function(res) {
          alert(res.data.error);
        });
  }
});
