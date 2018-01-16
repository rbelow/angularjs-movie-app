angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb', 'movieCore']) // eslint-disable-line
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'movie-app/home.html',
        controller: 'HomeController'
      })
      .when('/results', {
        templateUrl: 'movie-app/results.html',
        controller: 'ResultsController'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
