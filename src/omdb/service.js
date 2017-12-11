angular // eslint-disable-line
  .module('omdb', [])
  .factory('omdbApi', function ($http, $q) {
    // object literal pattern
    var API_KEY = '8424d302'
    var service = {}
    var baseUrl = 'http://www.omdbapi.com/?v=1&'

    function httpPromise (url) {
      var deferred = $q.defer()

      // console.log(baseUrl + 's=' + encodeURIComponent(query) + '&apikey=' + API_KEY)
      // `success()` and `error()` are deprecated: http://www.codelord.net/2015/05/25/dont-use-%24https-success/
      $http
        .get(url)
        .then(function (response) {
          deferred.resolve(response.data)
        })
        .catch(function () {
          deferred.reject()
        })

      return deferred.promise
    }

    service.search = function (query) {
      return httpPromise(baseUrl + 's=' + encodeURIComponent(query) + '&apikey=' + API_KEY)
    }

    service.find = function (id) {
      return httpPromise(baseUrl + 'i=' + id + '&apikey=' + API_KEY)
    }

    return service
  })
