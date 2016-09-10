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

    vm.platform = new H.service.Platform({
        'app_id': 't6ldZeZcFyWw3GWaYi6G',
        'app_code': 'ogKY0Ip_sKJro3CZe28-DA'
    });

    vm.mapTypes = vm.platform.createDefaultLayers();
    vm.map = new H.Map(
        document.getElementById('mapContainer'),
        vm.mapTypes.normal.map,
        {
            zoom: 10,
            center: { lat: 52.5, lng: 13.4 }
        });
}]);
