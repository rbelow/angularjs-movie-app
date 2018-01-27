/* eslint-env jasmine */

describe('Search Controller', function () {
  // "controller as" approach
  // var $this
  var $scope
  var $location
  // var $controller
  var $timeout

  // $controller(
  //   constructor, // string or function (for brainstorming)
  //   locals, // $scope object, other controller args
  //   [bindings] // object for controllerAs `this` binding
  // )

  beforeEach(module('movieApp'))

  beforeEach(inject(function (_$controller_, _$location_, _$timeout_) {
    $scope = {}
    $location = _$location_
    // $controller = _$controller_
    $timeout = _$timeout_
    _$controller_('SearchController', {
      $scope: $scope,
      $location: _$location_,
      $timeout: _$timeout_
    })

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

  // afterEach(function () {
  //   // https://docs.angularjs.org/api/ngMock/service/$httpBackend#verifyNoOutstandingExpectation
  //   $httpBackend.verifyNoOutstandingExpectation()
  //   $httpBackend.verifyNoOutstandingRequest()
  // })

  it('should redirect to the query results page for non-empty query', function () {
    // $this.query = 'star wars'
    // $this = $controller('SearchController', { $location: $location }, { query: 'star wars' })
    // $this.search()

    $scope.query = 'star wars'
    $scope.search()
    // https://docs.angularjs.org/api/ng/service/$location
    expect($location.url()).toBe('/results?q=star%20wars')
  })

  it('should not redirect to query results for empty query', function () {
    // $this.query = ''
    // $this = $controller('SearchController', { $location: $location }, { query: '' })
    // $this.search()

    $scope.query = ''
    $scope.search()
    expect($location.url()).toBe('')
  })

  // it('should redirect after 1 second of keyboard inactivity', function () {
  //   $scope.query = 'star wars'
  //   $scope.keyup()
  //   // FIXME: https://stackoverflow.com/questions/22405085/mocking-httpbackend-how-to-handle-unexpected-request-no-more-request-expect
  //   // https://github.com/angular/angular.js/issues/2507
  //   $timeout.flush()
  //   // NOTE: `verifyNoPendingTasks()` outputs usefull console log
  //   // $timeout.verifyNoPendingTasks()
  //   // expect(function() { $timeout.flush() }).toThrow()
  //  expect($timeout.verifyNoPendingTasks).not.toThrow()
  //  expect($location.url()).toBe('/results?q=star%20wars')
  // })

  it('should redirect after 1 second if keyboard inactivity', function () {
    $scope.query = 'star wars'
    $scope.keyup()
    $timeout.flush()
    expect($timeout.verifyNoPendingTasks).not.toThrow()
    expect($location.url()).toBe('/results?q=star%20wars')
  })

  it('should cancel timeout in keydown', function () {
    $scope.query = 'star wars'
    $scope.keyup()
    $scope.keydown()
    expect($timeout.verifyNoPendingTasks).not.toThrow()
  })

  it('should cancel timeout on search', function () {
    $scope.query = 'star wars'
    $scope.keyup()
    $scope.search()
    expect($timeout.verifyNoPendingTasks).not.toThrow()
  })
})
