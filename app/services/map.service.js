angular.module('myApp')
    .factory('MapService', function() {
        var MapService = {};
        // Methods
        MapService.init = init;
        MapService.getMap = getMap;

        MapService.init();

        function init() {
        	MapService.platform = new H.service.Platform({
		        'app_id': 't6ldZeZcFyWw3GWaYi6G',
		        'app_code': 'ogKY0Ip_sKJro3CZe28-DA'
		    });
		    MapService.mapTypes = MapService.platform.createDefaultLayers();
        }

        function getMap() {
        	return new H.Map(
		        document.getElementById('mapContainer'),
		        MapService.mapTypes.normal.map,
		        {
		            zoom: 10,
		            center: { lat: 52.5, lng: 13.4 }
		        });
        }

        return MapService;
    });
