var app = angular.module('demo', []);

app.controller('AppController', function($scope){

  $scope.items = [];
  var length = 10000;
  var data = [];
  for(var i = 0; i < length; i++) {
      data.push({
        value: i
      });
  }

  $scope.reload = function(which){
    $scope.items[which] = data;
  }
});

app.directive('myDirectiveBefore', function(){
  return {
    restrict: 'E',
    template: "<b>♥</b>",
    replace: true,
    link: function(scope,element,attr){
      scope.exp = scope.$eval(attr.exp);
      scope.$watch(attr.list, function(list){
          console.log("before exp changed");
      }, true);
    }
  };
});

app.directive('myDirectiveAfter', function($parse){
  return {
    restrict: 'E',
    template: "<b>♥</b>",
    replace: true,
    compile: function(element, attr){
      var exp = $parse(attr.exp);
      var list = $parse(attr.list)
      return function link(scope,element,attr){
        scope.exp = exp(scope);
        scope.$watchCollection(list, function(list){
            console.log("after exp changed");
        });
      }
    }
  };
});
