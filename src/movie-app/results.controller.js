angular // eslint-disable-line
  .module('movieApp')
  .controller('ResultsController', function ($scope, $location, omdbApi) {
    // $scope.results = []
    // $scope.results.push({ data: { Title:"Star Wars: Episode IV - A New Hope" }})
    // $scope.results.push({ data: { Title: "Star Wars: Episode V - The Empire Strikes Back" }})
    // $scope.results.push({ data: { Title: "Star Wars: Episode VI - Return of the Jedi" }})
    var query = $location.search().q

    // copied from `omdb/service.spec.js`
    omdbApi
      .search(query)
      .then(function (data) {
        $scope.results = data.Search
      })
      .catch(function () {
        $scope.errorMessage = 'Something went wrong!'
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
