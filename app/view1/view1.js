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
    vm.setWaypoints = setWaypoints;
    vm.drawPath = drawPath;
    vm.requestHelp = requestHelp;

    vm.viewName = " ";
    vm.waypoint;
    
    MapService.getLocation();

    function changeView(view) {
        vm.viewName = view;
    }

    function drawPath() {
        MapService.drawPath();
    }

    function setWaypoints(waypointType) {
        if (vm.waypoint) {
            MapService.placesSearch(MapService.platform, waypointType);
        }
    }

    function requestHelp() {
        alert('Sending help to your location!');
    }
}]);
