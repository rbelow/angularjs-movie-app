/* eslint-env jasmine */

describe('omdb', function () {
  var movieData = {
    'Title': 'Star Wars: Episode IV - A New Hope',
    'Year': '1977',
    'Rated': 'PG',
    'Released': '25 May 1977',
    'Runtime': '121 min',
    'Genre': 'Action, Adventure, Fantasy',
    'Director': 'George Lucas',
    'Writer': 'George Lucas',
    'Actors': 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing',
    'Plot': "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
    'Language': 'English',
    'Country': 'USA',
    'Awards': 'Won 6 Oscars. Another 50 wins & 28 nominations.',
    'Poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BZDk2NmNhZDgtZDgzZS00NTRkLWFiYjUtNGMzZTYwNTFhYjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    'Ratings': [
      {
        'Source': 'Internet Movie Database',
        'Value': '8.7/10'
      }, {
        'Source': 'Rotten Tomatoes',
        'Value': '93%'
      }, {
        'Source': 'Metacritic',
        'Value': '92/100'
      }
    ],
    'Metascore': '92',
    'imdbRating': '8.7',
    'imdbVotes': '1,009,663',
    'imdbID': 'tt0076759',
    'Type': 'movie',
    'DVD': '21 Sep 2004',
    'BoxOffice': 'N/A',
    'Production': '20th Century Fox',
    'Website': 'http://www.starwars.com/episode-iv/',
    'Response': 'True'
  }
  var movieDataById = {
    'Title': 'Star Wars: Episode IV - A New Hope',
    'Year': '1977',
    'Rated': 'PG',
    'Released': '25 May 1977',
    'Runtime': '121 min',
    'Genre': 'Action, Adventure, Fantasy',
    'Director': 'George Lucas',
    'Writer': 'George Lucas',
    'Actors': 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing',
    'Plot': "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
    'Language': 'English',
    'Country': 'USA',
    'Awards': 'Won 6 Oscars. Another 50 wins & 28 nominations.',
    'Poster': 'https://images-na.ssl-images-amazon.com/images/M/MV5BZDk2NmNhZDgtZDgzZS00NTRkLWFiYjUtNGMzZTYwNTFhYjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    'Ratings': [
      {
        'Source': 'Internet Movie Database',
        'Value': '8.7/10'
      }, {
        'Source': 'Rotten Tomatoes',
        'Value': '93%'
      }, {
        'Source': 'Metacritic',
        'Value': '92/100'
      }
    ],
    'Metascore': '92',
    'imdbRating': '8.7',
    'imdbVotes': '1,009,663',
    'imdbID': 'tt0076759',
    'Type': 'movie',
    'DVD': '21 Sep 2004',
    'BoxOffice': 'N/A',
    'Production': '20th Century Fox',
    'Website': 'http://www.starwars.com/episode-iv/',
    'Response': 'True'
  }
  var omdbApi = {}
  var $httpBackend

  // `module` and `inject` functions are so commonly called that `ngMock` makes
  // both available on the `window` object:
  //  * angular.mock.module('omdb') = module('omdb')
  beforeEach(module('omdb'))

  beforeEach(inject(function (_omdbApi_, _$httpBackend_) {
    omdbApi = _omdbApi_
    $httpBackend = _$httpBackend_
  }))

  it('should return search movie data', function () {
    // service to be tested
    // var omdbApi = {}

    // create angularjs module - technique 1 (can *not* be injected with other services)
    // angular.mock.module({
    //   'omdbApi': {
    //     search: function(query) {
    //       return movieData
    //     }
    //   }
    // })

    // create angularjs module - technique 2
    // angular.mock.module(function($provide) {
    //   $provide.factory('omdbApi', function() {
    //     return {
    //       search: function(query) {
    //         return movieData
    //       }
    //     }
    //   })
    // })

    // angular.mock.module('omdb')

    // create instance of angularjs module
    // angular.mock.inject(function(_omdbApi_) {
    //    omdbApi = omdbApi - name clash! solution to this problem is to use the
    //    naming convention _omdbApi_. this will be removed automatically when
    //    calling the service by it's name
    //   omdbApi = _omdbApi_
    // })

    // `dump` serializes common objects for debugging:
    // Primitive types
    // https://developer.mozilla.org/en-US/docs/Glossary/Primitive
    //
    // DOM elements
    // https://www.w3schools.com/jsref/dom_obj_all.asp
    //
    // JS objects
    // https://www.w3schools.com/js/js_objects.asp
    // **Do Not Declare Strings, Numbers, and Booleans as Objects!**
    //
    // AngularJS scope
    // https://www.w3schools.com/angular/angular_scopes.asp
    //
    // console.log(movieData)
    // console.log(angular.mock.dump(movieData))

    var response
    var expectedUrl = 'http://www.omdbapi.com/?v=1&s=star%20wars&apikey=8424d302'
    // var expectedUrl = function (url) {
    //    console.log(url)
    //    console.log(url.indexOf('http://www.omdbapi.com/'))
    //    check if the `url` is the correct one. if there is a typo the test fails!
    //    NOTE: where does `url` come from?
    //   return url.indexOf('http://www.omdbapi.com/') !== -1
    // }
    // match all urls
    // var expectedUrl = /.*/
    // var expectedUrl = /http:\/\/www.omdbapi.com\/\?v=1&s=star%20wars&apikey=8424d302/

    // console.log(expectedUrl)
    // mock the `$http` angularjs backend
    $httpBackend.when('GET', expectedUrl).respond(200, movieData)

    omdbApi.search('star wars').then(function (data) {
      response = data
    })

    // resolve all preconfigured `$httpBackend` definitions
    $httpBackend.flush()

    expect(response).toEqual(movieData)
  })

  it('should handle error', function () {
    var response

    $httpBackend
      .expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759&apikey=8424d302')
      .respond(500)

    omdbApi
      .find('tt0076759')
      .then(function (data) {
        response = data
      })
      .catch(function () {
        response = 'Error!'
      })

    $httpBackend.flush()

    expect(response).toEqual('Error!')
  })

  it('should return movie data by id', function () {
    var response

    $httpBackend
      .expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759&apikey=8424d302')
      .respond(200, movieData)

    omdbApi.find('tt0076759').then(function (data) {
      response = data
    })

    $httpBackend.flush()

    expect(response).toEqual(movieDataById)
  })
})
