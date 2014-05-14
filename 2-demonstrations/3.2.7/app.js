var myApp = angular.module('exampleApp', []);

myApp.controller('repeatCtrl', ['$scope', function($scope) {
	var i = 0,
			len = 5000,
			_items = [];

	var randomBoolean = function() {
		return Math.random()<.5;
	}

	for(i; i<len; i++) {
		_items.push({
			id: 'id_' + i,
			name: 'name_' + i,
			enabled: randomBoolean()
		});
	}
	
	$scope.items = _items;

	$scope.refresh = function() {

		console.time("Refreshing");

		$scope.items = angular.copy($scope.items);

		console.timeEnd("Refreshing");
		
	};

}]);