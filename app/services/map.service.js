angular.module('myApp')
    .factory('MapService', function() {
        var MapService = {};

        // Methods
        MapService.configureSettings = configureSettings;
        MapService.init = init;
        MapService.getMap = getMap;
        MapService.getLocation = getLocation;

        MapService.init();

        function init() {
        	MapService.platform = new H.service.Platform({
		        'app_id': 't6ldZeZcFyWw3GWaYi6G',
		        'app_code': 'ogKY0Ip_sKJro3CZe28-DA'
		    });
		    MapService.mapTypes = MapService.platform.createDefaultLayers();
        }

        function configureSettings() {
            
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(MapService.getMap);
            } else {
                console.log('failed to load current location');
            }
        }

        function getMap(position) {
        	var map = new H.Map(
		        document.getElementById('mapContainer'),
		        MapService.mapTypes.normal.map,
		        {
		            zoom: 10,
		            center: { lat: position.coords.latitude, lng: position.coords.longitude }
		        });
            
            // Enable the map event system
	        var mapevents = new H.mapevents.MapEvents(map);

	        // Enable map interaction (pan, zoom, pinch-to-zoom)
	        var behavior = new H.mapevents.Behavior(mapevents);

	        // Enable the default UI
	        var ui = H.ui.UI.createDefault(map, MapService.mapTypes);
        }

        return MapService;
    });
