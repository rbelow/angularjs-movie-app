/* eslint-env jasmine */

describe('MovieCore', function () {
  var PopularMovies
  var $httpBackend

  // `module` and `inject` functions are so commonly called that `ngMock` makes
  // both available on the `window` object:
  //  * angular.mock.module('omdb') = module('omdb')
  beforeEach(module('movieCore'))

  beforeEach(inject(function (_PopularMovies_, _$httpBackend_) {
    PopularMovies = _PopularMovies_
    $httpBackend = _$httpBackend_
  }))

  afterEach(function () {
    // https://docs.angularjs.org/api/ngMock/service/$httpBackend#verifyNoOutstandingExpectation
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  it('should create popular movie', function () {
    // var expectedData = function (data) {
    //   // '{"movieId":"tt0076759","description":"Great movie!"}'
    //   // dump(angular.mock.dump(data))
    //   // dump(data)
    //   // https://docs.angularjs.org/api/ng/function/angular.fromJson
    //   return angular.fromJson(data).movieId === 'tt0076759'
    //   // return true
    // }
    var expectedData = '{"movieId":"tt0076759","description":"Great movie!"}'
    // var expectedData = /{"movieId":"tt0076759","description":".*"}/

    var popularMovie = new PopularMovies({
      movieId: 'tt0076759',
      description: 'Great movie!'
    })

    $httpBackend
      .expectPOST(/./, expectedData)
      .respond(201)

    popularMovie.$save()

    // `toThrow()`
    // https://jasmine.github.io/2.8/introduction.html
    expect($httpBackend.flush).not.toThrow()
  })

  it('should get popular movie by id', function () {
    $httpBackend.expectGET('popular/tt0076759').respond(200)

    PopularMovies.get({ movieId: 'tt0076759' })

    expect($httpBackend.flush).not.toThrow()
  })

  it('should update popular movie', function () {
    var popularMovie = new PopularMovies({
      movieId: 'tt0076759',
      description: 'Great movie!'
    })

    $httpBackend.expectPUT('popular')
      .respond(200)

    popularMovie.$update()

    expect($httpBackend.flush).not.toThrow()
  })

  // it('should authenticate requests', function() {
  //   // var expectedHeaders = function (headers) {
  //   //   // dump(angular.mock.dump(headers))
  //   //   // return true
  //   //   // convert json to an js object
  //   //   return angular.fromJson(headers).authToken === 'teddybear'
  //   // }
  //   var expectedHeaders = {"authToken":"teddybear","Accept":"application/json, text/plain, */*"}
  //   $httpBackend
  //     .expectGET('popular/tt0076759', expectedHeaders)
  //     .respond(200)
  //   PopularMovies.get({ movieId: 'tt0076759' })
  //   $httpBackend.flush(1)
  // })

  it('should authenticate requests', function () {
    // var headerData = {authToken: 'teddybear', Accept: 'application/json, text/plain, */*'};
    var headerData = function (headers) {
      return headers.authToken === 'teddybear'
    }

    var matchAny = /.*/

    $httpBackend.whenGET(matchAny, headerData).respond(200)

    // `expect` best for testing exact usage
    $httpBackend.expectPOST(matchAny, matchAny, headerData).respond(200)

    $httpBackend.expectPUT(matchAny, matchAny, headerData).respond(200)

    $httpBackend.expectDELETE(matchAny, headerData).respond(200)

    var popularMovie = { id: 'tt0076759', description: 'This movie is great!' }

    PopularMovies.query()
    PopularMovies.get({ id: 'tt0076759' })
    new PopularMovies(popularMovie).$save()
    new PopularMovies(popularMovie).$update()
    new PopularMovies(popularMovie).$remove()

    expect($httpBackend.flush).not.toThrow()

    // `resetExpectations()` https://docs.angularjs.org/api/ngMock/service/$httpBackend#resetExpectations

    // controll how many pending http requests we wish to process with `flush(x)`
    // $httpBackend.flush(1)
    // $httpBackend.flush(1)
    // $httpBackend.flush(1)
    // $httpBackend.flush(1)
    // $httpBackend.flush(1)
  })
})
