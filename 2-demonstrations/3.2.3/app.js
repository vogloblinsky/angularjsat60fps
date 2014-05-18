var app = angular.module('demo', []);

app.controller('AppController', function($scope){
  function color(){
    return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
  (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  }
  function rebuild(){
    return [
      {color: { value: color() } },
      {color: { value: color() } },
      {color: { value: color() } },
      {color: { value: color() } },
      {color: { value: color() } },
      {color: { value: color() } }
    ];
  }
  $scope.colors = rebuild();
  $scope.watched = '';
  $scope.watchedTrue = '';
  $scope.watchedCollection = '';

  $scope.$watch('colors', function(newVal, oldVal){
    $scope.watched = newVal;
  });
  $scope.$watch('colors', function(newVal, oldVal){
    $scope.watchedTrue = newVal;
  }, true);
  $scope.$watchCollection('colors', function(newVal, oldVal){
    $scope.watchedCollection = newVal;
  });
  $scope.update = function() {
    // equality
    $scope.colors[(Math.random()*$scope.colors.length-1|0)].color.value = color();
  };
  $scope.add = function() {
    // collection
    $scope.colors.push({
      color: { value: color() }
    });
  };
  $scope.rebuild = function() {
    // watch
    $scope.colors = rebuild();
  };
  $scope.clear = function(){
    $scope.watched = '';
    $scope.watchedTrue = '';
    $scope.watchedCollection = '';
  }

});
