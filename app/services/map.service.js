angular.module('myApp')
    .factory('MapService', function() {
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
            return navigator.geolocation.getCurrentPosition(getMap);
          } else {
            return null;
            //mapContainer.innerHTML = "Geolocation is not supported by this browser.";
          }
        }

        function getMap(position) {
        	return new H.Map(
		        document.getElementById('mapContainer'),
		        MapService.mapTypes.normal.map,
		        {
		            zoom: 10,
		            center: { lat: position.coords.latitude, lng: position.coords.longitude }
		        });
        }

        return MapService;
    });
