var myApp = angular.module('exampleApp', ['once']);

myApp.controller('repeatCtrl', ['$scope', function($scope) {
	var i = 0,
			len = 100,
			_items = [];

	for(i; i<len; i++) {
		_items.push({
			id: 'id_'+i
		});
	}
	
	$scope.items = _items;

}]);