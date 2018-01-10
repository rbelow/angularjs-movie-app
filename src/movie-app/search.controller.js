angular // eslint-disable-line
  .module('movieApp')
  .controller('SearchController', function ($scope, $location, $timeout) {
    var timeout
    $scope.keyup = function () {
      timeout = $timeout($scope.search, 1000)
    }

    $scope.keydown = function () {
      $timeout.cancel(timeout)
    }

    // "controller as" approach: use `this` binding instead of `$scope` object
    // as the glue between controller and the views that interact with them
    $scope.search = function () { // `this.search`
      // console.log(this.query)
      $timeout.cancel(timeout)
      if ($scope.query) { // `this.query`
        // https://docs.angularjs.org/api/ng/service/$location#search
        $location.path('/results').search('q', $scope.query) // FIXME: `$http` `GET` exception
      }
    } // FIXME: `$http` `GET` exception
  })
 
