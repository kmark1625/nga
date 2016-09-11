angular.module('myApp')
    .factory('MapService2', function() {
        var MapService = {};

        // Methods
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

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(MapService.getMap);
            } else {
                console.log('failed to load current location');
            }
        }

        function getMap(position) {
        	MapService.map = new H.Map(
		        document.getElementById('mapContainer'),
		        MapService.mapTypes.normal.map,
		        {
		            zoom: 10,
		            center: { lat: position.coords.latitude, lng: position.coords.longitude }


		        });

            MapService.position = position;
            var mapevents = new H.mapevents.MapEvents(MapService.map);
            var behavior = new H.mapevents.Behavior(mapevents);
            var ui = H.ui.UI.createDefault(MapService.map, MapService.mapTypes);
        }

		return MapService;
});
