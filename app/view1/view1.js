'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['MapService', function(MapService) {
    var vm = this;


    var position = MapService.getLocation();
    vm.map = MapService.getMap(position);




}]);
