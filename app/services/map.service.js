angular.module('myApp')
    .factory('MapService', function() {
        var MapService = {};

        // Methods
        MapService.init = init;
        MapService.drawPath = drawPath;
        MapService.getMap = getMap;
        MapService.getLocation = getLocation;
        MapService.placesSearch = placesSearch;
        MapService.calculateRoute = calculateRoute;
        MapService.geocode = geocode;
        MapService.init();

        function init() {
        	MapService.platform = new H.service.Platform({
		        'app_id': 't6ldZeZcFyWw3GWaYi6G',
		        'app_code': 'ogKY0Ip_sKJro3CZe28-DA'
		    });
	        MapService.router = MapService.platform.getRoutingService()
			MapService.mapTypes = MapService.platform.createDefaultLayers();
	        MapService.releaseRoutingShown = false;
	        MapService.geocoder = MapService.platform.getGeocodingService();
	        MapService.group = new H.map.Group();
	        MapService.maxCount = 0;
        }
        
        function drawPath() {
        	var displayReady = function(e)
            {
				MapService.map.removeEventListener('mapviewchangeend',displayReady);
				MapService.calculateRoute();
            };
            MapService.map.addEventListener("mapviewchangeend", displayReady);
            var zoom = MapService.map.getZoom();
            MapService.map.setZoom(zoom + .01);
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

            MapService.geocode();
        }

        // @param {H.service.platform}
          function placesSearch (platform){
            var string = MapService.position.coords.latitude + "," + MapService.position.coords.longitude
            var placesService = platform.getPlacesService(),
              parameters = {
                at: string,
                q: 'gas station'};
            placesService.search(parameters, function (result){
               visualize(result)
            }, function(error) {
              console.log(error);
            });
          }

          function visualize(result){
            var items = result.results.items
            for(var i = 0; i < items.length; i++)
            {
              var coordinates = items[i].position
              addMarker(coordinates)
            }
          }

          function addMarker(position, icon, contentDiv)
          {
            var positionValue = {lat:position[0], lng:position[1]};
            var marker = new H.map.Marker(positionValue);
            MapService.map.addObject(marker);
            MapService.map.setCenter(positionValue);
            //marker.setData(contentDiv.innerHTML);
            //add 'tap' event listener, that opens info bubble, to the group
          }

          function calculateRoute(){
            var string = MapService.position.coords.latitude + "," + MapService.position.coords.longitude;
            var newPos = {'lat': MapService.position.coords.latitude + .005, 'lon': MapService.position.coords.longitude + .01}
            var string2 = newPos.lat + ',' + newPos.lon;
            var calculateRouteParams = {
              'waypoint0' : '41.883404,-87.624454',
              'waypoint1' : string2,
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
			var position = [MapService.position.coords.latitude, MapService.position.coords.longitude];
		},
		onError = function(error) {
			console.log(error);
		}
		MapService.router.calculateRoute(calculateRouteParams, onResult, onError);
	}
	
  function geocode()
	{
		//add Geocoder Release information if not already done


		var searchText = "The Loop Chicago US";
		MapService.geocoder.geocode({
			searchText: searchText,
			'additionalData': 'IncludeShapeLevel,default'
		},
		function(result) {
			createPolygon(result);
		},
		function(error) {
			alert(error);
		});
	};

  //Create Polygon
  var createPolygon = function(result)
	{
		//Proof of already shown objects
		MapService.group.removeAll();

		if(result.Response.View[0].Result[0].Location != null)
		{
			pos = result.Response.View[0].Result[0].Location.DisplayPosition;
		}
		else
		{
			pos = result.Response.View[0].Result[0].Place.Locations[0].DisplayPosition;
		}

		point = new H.geo.Point(pos.Latitude, pos.Longitude);

		if(result.Response.View[0].Result[0].Location != null)
		{
			address = result.Response.View[0].Result[0].Location.Address;
		}
		else
		{
			address = result.Response.View[0].Result[0].Place.Locations[0].Address;
		}

		matchLevel = result.Response.View[0].Result[0].MatchLevel;

		label = address.Label;

		line1 = "MatchLevel: "+matchLevel;
		line2 = label;

		marker = new H.map.Marker(point,
			{
				icon: createIcon( line1, line2)
			});

			//group.addObject(marker);

			if (typeof(result.Response.View[0].Result[0].Location.Shape) == "undefined")
			{
				//alert('Found Address too detailed!');
			}
			else
			{
				var shapes = new Array();
				var respShape = result.Response.View[0].Result[0].Location.Shape.Value;
				if(respShape.indexOf("), (") != -1)
				{
					shapes = respShape.replace("MULTIPOLYGON", "").replace("POLYGON", "").trim().split("), (");
				}
				else
				{
					shapes[0] = respShape.replace("MULTIPOLYGON", "").replace("POLYGON", "").replace("((", "").replace("))", "").trim();
				}

				for (var j = 0; j < shapes.length; j++)
				{
					var strip = new H.geo.Strip();
					var newCoords = shapes[j].replace("(((", "").replace(")))", "").replace("((", "").replace("))", "").replace("(", "").replace(")", "").trim().split(",");
					for (var i = 0; i < newCoords.length; i++)
					{
						var split = newCoords[i].trim().split(" ");
						if(split.length === 2){
							var lat = parseFloat(split[1]);
							var lon = parseFloat(split[0]);
							strip.pushLatLngAlt( lat, lon, 0);
						}
					}

					if(strip.getPointCount() > MapService.maxCount)
					{
						MapService.maxCount = strip.getPointCount();
						console.log(strip.getPointCount());
					}


					shp = new H.map.Polygon(strip,
						{
							style:
							{
								lineWidth: 5,
								strokeColor: "rgba(50, 128, 128, 0.5)"
							}
						}
					);
					MapService.group.addObject(shp);
				}
			}
			MapService.map.addObject(MapService.group);
			MapService.map.setViewBounds(MapService.group.getBounds());

	}
  //end create polygon

  var createIcon = function (line1, line2) {
    var svgMarkerImage_Line='<svg width="__widthAll__" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
	'<g>' +
	'<rect id="label-box" ry="3" rx="3" stroke="#000000" height="30" width="__width__" y="11" x="45" fill="#ffffff"/>'+
	'<text id="label-text" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="10" font-weight="bold" y="24" x="55" stroke-width="0" fill="#000000">__line1__</text>' +
	'<text id="label-desc" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="8" y="36" x="55" stroke-width="0" fill="#000000">__line2__</text>'+
	'<image width="50" height="50" x="8.5" y="9.5" xlink:href="data:image/png;base64,R0lGODlhfQDCAPQdAAELHgEMHgIMHw8LHRALHR8KGyAKGxEbLCEqOzE5SUBIVkFIV2Fnc3B1gHF2gYCFjoCFj4+UnJCVnZ+jqqCkq6+yuLCzuc/R1NDS1d/g4uDh4+/v8PDw8f///wAAAAAAACH5BAEAAB4ALAAAAAB9AMIAAAX+oCeOJCmcaKqubOu+cCyvZW2XxKzvfO+vhNvN8Csaj0eD0IRsOp+vpQdKrUKF1qy2aNt6v7MSEUwup5Qjs9o8yq3f3uAUTteK6vjqPc9v7vuAP3OBhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnCkICwoMEA4KCwidWgsSGB2trq+uFxEKqEcHHhUcsLu8HRsTHge1OwgTvcfIE6fDLwcQyNDIEMLMKs4b0dm9G9PVJwkZ2uK9GQnVDOPpvQzDEervuxGdBxXw9q8V1JgHF/f+rRf0VeL3r2DAS/UKFqxgSYLChxIooXv4kF2kBBQzmnt0IFzGhxkELnr2kSIERwf+sJV8uEEkIpIrH55chCDmx2WJKNjMSEHRgZ0fXQaaCLRiIgtFKfZEpDJpwQ2IFjiluOCQw6kKIxrqh9Xgoa4Pv4ItaKjm2H84AUk9668qobVs7bkNBDPuOweF6tpNN5PuXnh43/59N1ftYHWF+2A8PC4tIMbjxELOdojVZGgYrF6GprUQ3M28EgfSBXoXh6Oldy09RDR1K4uHfrp2JTSQztmrEZl17fiQ3st9fZLezKG2od+Mgy86oGGzhoubN0JqPRh2pKuDO09C+tfCpQOW42IwzjH82PGaDnAHa4H8JOxTtXOiDtQ6qgTNgWqQzszZ8I8cKOeNMyV14w0LCNz+VhAFvR1oDQMU/CcOBxQw4J6DKqhi3jGyiIZhD58s4MAoC5jy4Ykopqjiiiy26OKLMMYo44w01mgjIIPcqMMfOoaRY48x8AgkDCIMMGQMA6RxZBQjFLBkCwWU8CQLXUyJAhZWShEJAAIE0GUAYIYp5phenkAmmCpw2YIUIjjZiJpbwKlClGyOYOQiclYBQJ4nJFknloXwCcWeKfxp6KGIJiplFn4q6uijkNagRaORVmrpoYxeqummS2TK6aeg/ugEpaGWGqkVpJqqaqJjXLHqq47qAeush7bqBK24/klFrrwuYSsSvQZb5a3CFiuCG34Ya+wTyhqL7BHNLptstMHTEktttcBeiy202m7LRbe9Zgsur9yOm2u55uJqRLrkfsuuuoK8C68P8uL664710upDqvmaei+S/erLA78Bh/qsDAQXDOrACsN6MAwJN8zpDhFLrOnDLlRs8aX4bqxqxx6b6mPIIstA8qomn1wykSqv7ELLLq8Jc6ksz7wwkzbfLHPOn+LM86b/nvCzzjQMzWnQRvdMZdKbYsz0xEU/fenDUm8addWVHoy1pipszTEKGnuta59iWwp22WYLEDbaWqrNdqVuvw1p3HI/unbdeOetN6whAAA7" />'+
	'</g>'+
	'</svg>';
		var svgMarker = svgMarkerImage_Line;

		svgMarker = svgMarker.replace(/__line1__/g, line1);
		svgMarker = svgMarker.replace(/__line2__/g, line2);
		svgMarker = svgMarker.replace(/__width__/g, line2.length  * 4 + 10);
		svgMarker = svgMarker.replace(/__widthAll__/g, line2.length  * 4 + 80);

		return new H.map.Icon(svgMarker, {
			anchor: new H.math.Point(24, 57)
		});;
	};
  // end createIcon
        return MapService;
    });
