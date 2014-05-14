var myApp = angular.module('exampleApp', []);

myApp.controller('repeatCtrl', ['$scope', function($scope) {
	var i = 0,
			len = 5000,
			_items = [];

	for(i; i<len; i++) {
		_items.push({
			id: 'id_'+i
		});
	}
	
	$scope.items = _items;

	$scope.refresh = function() {

		console.time("Refreshing");

		$scope.items = angular.copy($scope.items);

		console.timeEnd("Refreshing");
		
	};

}]);