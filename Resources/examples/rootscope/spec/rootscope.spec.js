describe('rootScope', function() {

	var $rootScope;
	var $scope;

	var menuController = function($scope) {
		$scope.items = [
			'Beverages',
			'Condiments'
		];
		$scope.$on('selected', function(mass) {
			$scope.message = 'You selected ' + $scope.items[$scope.selected];
		});
	};

	beforeEach(inject(function(_$controller_, _$rootScope_) {
		$rootScope = _$rootScope_;
		$rootScope.selected = 0;
		$scope = $rootScope.$new();
		// $rootScope.$new();
		// $rootScope.$new();
		// $rootScope.$new();
		_$controller_(menuController, {
			$scope: $scope
		});
	}));

	it('should demo rootScope', function() {
		$scope.$emit('selected');
		console.log(angular.mock.dump($rootScope));
		console.log(angular.mock.dump($scope));
		// console.log('root', $rootScope.$countChildScopes());
		// console.log('root', $scope.$countChildScopes());
		console.log('root', $rootScope.$countWatchers());
		console.log('child', $scope.$countWatchers());
		expect($scope.message).toBe('You selected Beverages');
	});
});
