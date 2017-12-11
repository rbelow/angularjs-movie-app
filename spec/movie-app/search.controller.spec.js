/* eslint-env jasmine */

describe('Search Controller', function () {
  // "controller as" approach
  var $this
  var $location
  var $controller

  // $controller(
  //   constructor, // string or function (for brainstorming)
  //   locals, // $scope object, other controller args
  //   [bindings] // object for controllerAs `this` binding
  // )

  beforeEach(module('movieApp'))

  beforeEach(inject(function (_$controller_, _$location_) {
    $controller = _$controller_
    $location = _$location_
    // _$controller_('SearchController', { $scope: $scope, $location: $location })

    // var fn = function($scope) {
    //   $scope.search = function () {
    //     if ($scope.query) {
    //       // https://docs.angularjs.org/api/ng/service/$location#search
    //       $location.path('/results').search('q', $scope.query)
    //     }
    //   }
    // }

    // pass `$location` to the `locals` `$controller` argument. it's passed anyway
    // but it makes it more clear what the controller needs!
    // _$controller_(fn, { $scope: $scope, $location: $location })
  }))

  it('should redirect to the query results page for non-empty query', function () {
    // $this.query = 'star wars'
    $this = $controller('SearchController', { $location: $location }, { query: 'star wars' })
    $this.search()
    // https://docs.angularjs.org/api/ng/service/$location
    expect($location.url()).toBe('/results?q=star%20wars')
  })

  it('should not redirect to query results for empty query', function () {
    // $this.query = ''
    $this = $controller('SearchController', { $location: $location }, { query: '' })
    $this.search()
    expect($location.url()).toBe('')
  })
})
