'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as vm'
  });
}])

.controller('View1Ctrl', ['MapService', function(MapService) {
    var vm = this;
    vm.changeView = changeView;

    vm.viewName = "Custom";
    
    MapService.getLocation();

    function changeView(view) {
        vm.viewName = view;
    }
}]);
