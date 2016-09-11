angular.module('myApp')
    .factory('MapService', function() {
        var MapService = {};

        // Methods
        MapService.configureSettings = configureSettings;
        MapService.init = init;
        MapService.getMap = getMap;
        MapService.getLocation = getLocation;
        MapService.placesSearch = placesSearch;
        MapService.calculateRoute = calculateRoute;
        MapService.init();

        function init() {
        	MapService.platform = new H.service.Platform({
		        'app_id': 't6ldZeZcFyWw3GWaYi6G',
		        'app_code': 'ogKY0Ip_sKJro3CZe28-DA'
		    });
        MapService.router = MapService.platform.getRoutingService()
		    MapService.mapTypes = MapService.platform.createDefaultLayers();
        MapService.releaseRoutingShown = false;

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
        	MapService.map = new H.Map(
		        document.getElementById('mapContainer'),
		        MapService.mapTypes.normal.map,
		        {
		            zoom: 10,
		            center: { lat: position.coords.latitude, lng: position.coords.longitude }


		        });

            MapService.position = position
            var mapevents = new H.mapevents.MapEvents(MapService.map);
            var behavior = new H.mapevents.Behavior(mapevents);
            var ui = H.ui.UI.createDefault(MapService.map, MapService.mapTypes);
            var displayReady = function(e)
            {
              MapService.map.removeEventListener('mapviewchangeend',displayReady);
              MapService.calculateRoute();
            };
            MapService.map.addEventListener("mapviewchangeend", displayReady)
            MapService.placesSearch(MapService.platform)
        }
        // @param {H.service.platform}
          function placesSearch (platform){
            var string = MapService.position.coords.latitude + "," + MapService.position.coords.longitude
            var placesService = platform.getPlacesService(),
              parameters = {
                at: string,
                q: 'gas station'};
            placesService.search(parameters, function (result){
              console.log(result);
            }, function(error) {
              console.log(error);
            });
          }
          function addMarker(position, icon, contentDiv)
          {
            var positionValue = {lat:position[0], lng:position[1]};
            var marker = new H.map.Marker(positionValue);
            map.addObject(marker);
            map.setCenter(positionValue);
            marker.setData(contentDiv.innerHTML);
            //add 'tap' event listener, that opens info bubble, to the group
          }
          function calculateRoute(){
            var string = MapService.position.coords.latitude + "," + MapService.position.coords.longitude
            var calculateRouteParams = {
              'waypoint0' : string,
              'waypoint1' : '41.888404,-87.624454',
              'mode': 'fastest;car;traffic:disabled',
              'representation' : 'display'
            },
            onResult = function(result) {
			           //add Routing Release number if not already done
			              if (MapService.releaseRoutingShown== false){
				                      MapService.releaseRoutingShown = true;
			                  }
			              var strip = new H.geo.Strip(),
			              shape = result.response.route[0].shape,
			              i,
			              l = shape.length;

			              for(i = 0; i < l; i++)
			              {
				                  strip.pushLatLngAlt.apply(strip, shape[i].split(',').map(function(item) { return parseFloat(item); }));
			              }
			              var polyline = new H.map.Polyline(strip,
				           {
					        style:
					      {
						lineWidth: 10,
						strokeColor: "rgba(0, 128, 0, 0.7)"
					}
				});

				MapService.map.addObject(polyline);
				 MapService.map.setViewBounds(polyline.getBounds(), true);
		},
		onError = function(error) {
			console.log(error);
		}
		MapService.router.calculateRoute(calculateRouteParams, onResult, onError);
	}
        return MapService;
    });
