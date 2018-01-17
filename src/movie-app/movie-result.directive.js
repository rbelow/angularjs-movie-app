angular.module('movieApp')
  .directive('movieResult', function () {
    return {
      // restrict this directive to be an element
      restrict: 'E',
      // `replace` element with html
      replace: true,
      // set up scope object with a configured result property
      scope: {
        result: '=result'
      },
      template: [
        '<div class="row">',
        '<div class="col-sm-4">',
        '<img ng-src="{{ result.Poster }}" alt="{{ result.Title }}" width="220">',
        '</div>',
        '<div class="col-sm-8">',
        '<h3>{{ result.Title }}</h3>',
        '<p>{{ result.Plot }}</p>',
        '<p><strong>Director:</strong> {{ result.Director }}</p>',
        '<p><strong>Actors:</strong> {{ result.Actors }}</p>',
        '<p><strong>Released:</strong> {{ result.Released }}</p>',
        '<p><strong>Genre:</strong> {{ result.Genre }}</p>',
        '</div>',
        '</div>'
      ].join('')
    }
  })