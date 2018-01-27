/* eslint-env jasmine */

// TODO: debug
describe('Home Controller', function () {
  var results = [
    {
      'Title': 'Star Wars: Episode IV - A New Hope',
      'imdbID': 'tt0076759'
    },
    {
      'Title': 'Star Wars: Episode V - The Empire Strikes Back',
      'imdbID': 'tt0080684'
    },
    {
      'Title': 'Star Wars: Episode VI - Return of the Jedi',
      'imdbID': 'tt0086190'
    }
  ]
  var $scope
  var $interval
  var $q
  var $controller
  var $rootScope
  var omdbApi
  var PopularMovies
  var $exceptionHandler
  var $log

  // beforeEach(module('omdb'))
  beforeEach(module('movieApp'))

  beforeEach(module(function ($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log')
  }))

  beforeEach(module(function ($logProvider) {
    // configure debugging level (default is `true`)
    $logProvider.debugEnabled(true)
  }))

  // beforeEach(inject(function (_$interval_, _omdbApi_) {
  //   $scope = {}
  //   $interval = _$interval_ // eslint-disable-line no-global-assign
  //   omdbApi = _omdbApi_
  // }))

  // mock `$http` calls
  // beforeEach(inject(function (_$q_, _PopularMovies_) {
  //   spyOn(_PopularMovies_, 'get').and.callFake(function () {
  //     // https://docs.angularjs.org/api/ng/service/$q#defer
  //     var deferred = _$q_.defer()
  //     deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190'])
  //     return deferred.promise
  //   })
  // }))

  // mock `omdbApi.find` function
  beforeEach(inject(function (_$q_, _omdbApi_) {
    spyOn(_omdbApi_, 'find').and.callFake(function () {
      var deferred = _$q_.defer()
      // https://jasmine.github.io/2.4/introduction.html#section-36
      var args = _omdbApi_.find.calls.mostRecent().args[0]

      if (args === 'tt0076759') {
        deferred.resolve(results[0])
      } else if (args === 'tt0080684') {
        deferred.resolve(results[1])
      } else if (args === 'tt0086190') {
        deferred.resolve(results[2])
      } else if (args === 'ttError') {
        deferred.reject('error finding movie')
      } else {
        deferred.reject()
      }

      return deferred.promise
    })
  }))

  beforeEach(inject(function (_$controller_, _$interval_, _$q_, _$exceptionHandler_, _$log_, _$rootScope_, _omdbApi_, _PopularMovies_) {
    $scope = {}
    $interval = _$interval_ // eslint-disable-line no-global-assign
    $q = _$q_
    $controller = _$controller_
    $rootScope = _$rootScope_
    $exceptionHandler = _$exceptionHandler_
    $log = _$log_
    omdbApi = _omdbApi_
    PopularMovies = _PopularMovies_
  }))

  // beforeEach(inject(function (_$controller_, _$interval_, _$rootScope_, _omdbApi_, _PopularMovies_) {
  //   _$controller_('HomeController', {
  //     $scope: $scope,
  //     $interval: $interval,
  //     omdbApi: omdbApi,
  //     PopularMovies: _PopularMovies_
  //   })
  //
  //   // NOTE: you need to include `$rootScope` in tests that resolve promises!
  //   // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$apply
  //   // https://docs.angularjs.org/api/ng/service/$rootScope
  //   _$rootScope_.$apply()
  // }))

  it('should rotate movies every 5 seconds', function () {
    spyOn(PopularMovies, 'get').and.callFake(function () {
      // https://docs.angularjs.org/api/ng/service/$q#defer
      var deferred = $q.defer()
      deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190'])
      return deferred.promise
    })

    $controller('HomeController', {
      $scope: $scope,
      $interval: $interval,
      omdbApi: omdbApi,
      PopularMovies: PopularMovies
    })
    $rootScope.$apply()

    // should have a default movie
    expect($scope.result.Title).toBe(results[0].Title)
    // should update after 5 seconds
    $interval.flush(5000)
    expect($scope.result.Title).toBe(results[1].Title)
    // should update after 5 seconds
    $interval.flush(5000)
    expect($scope.result.Title).toBe(results[2].Title)
    // should return to default
    $interval.flush(5000)
    expect($scope.result.Title).toBe(results[0].Title)

    // clear all log levels
    // $log.reset()

    // throw an exception if any of the log levels has a value.
    // if this happens, details are displayed in the console output
    // $log.assertEmpty()

    expect($log.log.logs[0]).toEqual(['standard log'])
    // console.log(angular.mock.dump($log.log.logs))
    // console.log(angular.mock.dump($log.info.logs))
    // console.log(angular.mock.dump($log.error.logs))
    // console.log(angular.mock.dump($log.warn.logs))
    // console.log(angular.mock.dump($log.debug.logs))
  })

  it('should handle error', function () {
    spyOn(PopularMovies, 'get').and.callFake(function () {
      // https://docs.angularjs.org/api/ng/service/$q#defer
      var deferred = $q.defer()
      deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190', 'ttError'])
      return deferred.promise
    })

    $controller('HomeController', {
      $scope: $scope,
      $interval: $interval,
      omdbApi: omdbApi,
      PopularMovies: PopularMovies
    })
    $rootScope.$apply()

    // should have a default movie
    expect($scope.result.Title).toBe(results[0].Title)
    // should update after 5 seconds
    $interval.flush(5000)
    expect($scope.result.Title).toBe(results[1].Title)
    // should update after 5 seconds
    $interval.flush(5000)
    expect($scope.result.Title).toBe(results[2].Title)
    // should return to default
    $interval.flush(5000)
    // expect($scope.result.Title).toBe(results[0].Title)

    // FIXME: error string is not passed
    console.log($exceptionHandler.errors)
    expect($exceptionHandler.errors).toEqual(['error finding movie'])
  })
})
