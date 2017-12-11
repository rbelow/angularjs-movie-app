angular // eslint-disable-line
  .module('movieApp')
  .controller('SearchController', function ($location) {
    // "controller as" approach: use `this` binding instead of `$scope` object
    // as the glue between controller and the views that interact with them
    this.search = function () {
      // console.log(this.query)
      if (this.query) {
        // https://docs.angularjs.org/api/ng/service/$location#search
        $location.path('/results').search('q', this.query)
      }
    }
  })
