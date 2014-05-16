var myApp = angular.module('exampleApp', []);

myApp.filter('upper', function () {
  return function (input) {
  	console.log('upperFilter for : ' + input);
    return input.toUpperCase();
  };
});

myApp.controller('repeatCtrl', ['$scope', 'upperFilter', function($scope, upperFilter) {
	var i 				= 0,
		len 			= 500,
		_items 			= [],
		_itemsOptimized = []
		_names 			= [
			'Luke',
			'Yoda',
			'Obiwan',
			'Anakin',
			'Leia'
		];

	for(i; i<len; i++) {
		_items.push({
			name: _names[Math.floor(Math.random() * _names.length)]
		});
		_itemsOptimized.push({
			name: upperFilter(_names[Math.floor(Math.random() * _names.length)])
		});
	}
	
	$scope.items = _items;

	$scope.itemsOptimized = _itemsOptimized;

}]);

