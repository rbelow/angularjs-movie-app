/* eslint-env jasmine */

describe('Results Controller', function () {
  var results = {
    'Search': [
      {
        'Title': 'Star Wars: Episode IV - A New Hope',
        'Year': '1977',
        'imdbID': 'tt0076759',
        'Type': 'movie'
      }, {
        'Title': 'Star Wars: Episode V - The Empire Strikes Back',
        'Year': '1980',
        'imdbID': 'tt0080684',
        'Type': 'movie'
      }, {
        'Title': 'Star Wars: Episode VI - Return of the Jedi',
        'Year': '1983',
        'imdbID': 'tt0086190',
        'Type': 'movie'
      }
    ]
  }
  var $controller
  var $location
  var $q
  var $rootScope
  var $scope
  var $exceptionHandler
  var $log
  var omdbApi

  // beforeEach(module('omdb'))
  beforeEach(module('movieApp'))

  beforeEach(module(function ($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log')
  }))

  beforeEach(module(function ($logProvider) {
    // override `app.js` `$log` settings
    $logProvider.debugEnabled(true)
  }))

  beforeEach(inject(function (_$controller_, _$location_, _$q_, _$rootScope_, _$exceptionHandler_, _$log_, _omdbApi_) {
    $controller = _$controller_
    $scope = {}
    $location = _$location_
    $q = _$q_
    $rootScope = _$rootScope_
    $exceptionHandler = _$exceptionHandler_
    $log = _$log_
    omdbApi = _omdbApi_
  }))

  it('should load search results', function () {
    // `spyOn`
    // https://jasmine.github.io/2.8/introduction.html#section-Spies
    // enables us to specify what we wish to mock by pasing the first object as
    // an argument and the name of the function we wish to target as the second
    // argument e. g. `spyOn(omdbApi, 'search')`
    //
    // `callFake`
    // https://jasmine.github.io/2.8/introduction.html#section-Spies:_<code>and.callFake</code>
    // call fake function instead original one (so we can controll the execution flow and don't need to concern about the inner workings of the real function)
    spyOn(omdbApi, 'search').and.callFake(function () {
      var deferred = $q.defer()
      deferred.resolve(results)
      return deferred.promise
    })
    $location.search('q', 'star wars')
    $controller('ResultsController', { $scope: $scope })
    // resolve the promise calling `$apply()` on the `$rootScope` service, triggering
    // angularjs's event cycle
    $rootScope.$apply()
    // expect($scope.results[0].data.Title).toBe(results.Search[0].Title)
    expect($scope.results[0].Title).toBe(results.Search[0].Title)
    expect($scope.results[1].Title).toBe(results.Search[1].Title)
    expect($scope.results[2].Title).toBe(results.Search[2].Title)
    // https://jasmine.github.io/2.8/introduction.html#section-20
    expect(omdbApi.search).toHaveBeenCalledWith('star wars')
    console.log($log.debug.logs)
    expect($log.debug.logs[0]).toEqual(['Controller loaded with query: ', 'star wars'])
    expect($log.debug.logs[1]).toEqual(['Data returned for query: ', 'star wars', results])
  })

  it('should set result status to error', function () {
    spyOn(omdbApi, 'search').and.callFake(function () {
      var deferred = $q.defer()
      // https://docs.angularjs.org/api/ng/service/$q#reject
      deferred.reject('Something went wrong!')
      return deferred.promise
    })
    $location.search('q', 'star wars')
    // $controller('ResultsController', { $scope: $scope })
    // resolve the promise calling `$apply()` on the `$rootScope` service, triggering
    // angularjs's event cycle
    // $rootScope.$apply()
    // expect($scope.results[0].data.Title).toBe(results.Search[0].Title)
    // expect($scope.errorMessage).toBe('Something went wrong!')

    // test `$exceptionHandler` default `rethrow` mode
    // expect(function () {
    //   $controller('ResultsController', { $scope: $scope })
    //   $rootScope.$apply()
    // }).toThrow('Something went wrong!')

    $controller('ResultsController', { $scope: $scope })
    $rootScope.$apply()
    // console.log($exceptionHandler.errors)
    expect($exceptionHandler.errors[0]).toEqual('Something went wrong!')
  })
})
