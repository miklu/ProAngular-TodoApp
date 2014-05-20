
// Parametrina moodulin nimi sekä tarvittavat moduulit
var todoApp = angular.module('todoApp', []);

var model = {
  user: 'Miikka',
};

todoApp.run(function($http) {
  $http.get('js/todo.json').success(function(data) {
    model.items = data;
  });
});

todoApp.filter('checkedItems', function() {
  return function(items, showComplete) {
    var resultArr = [];
    angular.forEach(items, function(item) {
      if(item.done === false || showComplete === true) {
        resultArr.push(item);
      }
    });
    return resultArr;
  };
});

todoApp.controller('ToDoCtrl', function($scope){
  $scope.todo = model;

  $scope.incompleteCount = function() {
    var count = 0;
    angular.forEach($scope.todo.items, function(item) {
      if(!item.done) {count++;}
    });
    return count;
  };

  $scope.warningLevel = function() {
    return $scope.incompleteCount() < 2 ? 'label-success' : 'label-warning';
  };

  $scope.addNewItem = function(actionText) {
    $scope.todo.items.push({action: actionText, done: false});
  };

});