angular // eslint-disable-line
  .module('movieCore', ['ngResource'])
  .factory('PopularMovies', function ($resource) {
    // a factory which creates a resource object that lets you interact with restful server-side data sources
    // requires the `ngResource` module to be installed
    // https://docs.angularjs.org/api/ngResource/service/$resource
    var token = 'teddybear' // TBC
    return $resource('popular/:movieId', { movieId: '@id' }, {
      update: {
        method: 'PUT',
        headers: { 'authToken': token }
      },
      get: {
        method: 'GET',
        headers: { 'authToken': token }
      },
      query: {
        method: 'GET',
        headers: { 'authToken': token }
      },
      save: {
        method: 'POST',
        headers: { 'authToken': token }
      },
      remove: {
        method: 'DELETE',
        headers: { 'authToken': token }
      }
    })
  })
