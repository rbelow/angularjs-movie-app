angular // eslint-disable-line
  .module('movieApp')
  .controller('ResultsController', function ($scope, $location, $exceptionHandler, $log, omdbApi) {
    // $scope.results = []
    // $scope.results.push({ data: { Title:"Star Wars: Episode IV - A New Hope" }})
    // $scope.results.push({ data: { Title: "Star Wars: Episode V - The Empire Strikes Back" }})
    // $scope.results.push({ data: { Title: "Star Wars: Episode VI - Return of the Jedi" }})
    var query = $location.search().q

    $log.debug('Controller loaded with query: ', query)

    // copied from `omdb/service.spec.js`
    omdbApi
      .search(query)
      .then(function (data) {
        $log.debug('Data returned for query: ', query, data)
        $scope.results = data.Search
      })
      .catch(function (e) {
        // it's *not* angularjs best practice to `throw` native exceptions
        // throw 'Something went wrong!' // eslint-disable-line
        $exceptionHandler(e)
        // $exceptionHandler(e)
        // $exceptionHandler('something else went wrong')
      })

    // expand search result movie data
    $scope.expand = function expand (index, id) {
      omdbApi.find(id)
        .then(function (data) {
          $scope.results[index].data = data
          $scope.results[index].open = true
        })
    }
  })
