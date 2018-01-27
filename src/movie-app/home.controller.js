angular.module('movieApp')
  .controller('HomeController', function ($scope, $interval, $exceptionHandler, $log, omdbApi, PopularMovies) {
    $log.log('standard log')
    // $log.info('info log')
    // $log.error('error log')
    // $log.warn('warn log')
    // $log.debug('some debug information')

    // TODO: debug
    var results = []
    var idx = 0
    // encapsulate `omdbApi.find` function
    var findMovie = function (id) {
      omdbApi.find(id)
        .then(function (data) {
          $scope.result = data
        })
        .catch(function (e) {
          $exceptionHandler(e)
        })
    }

    // $scope.result = {}

    // Get PopularMovies List
    PopularMovies.query(function (data) {
        // 'tt0076759', 'tt0080684', 'tt0086190'
        // var data = ['tt0076759', 'tt0080684', 'tt0086190']
      results = data
      findMovie(results[0])

      $interval(function () {
        ++idx
        findMovie(results[idx % results.length])
      }, 5000)
    })
  })
