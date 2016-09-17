angular.module('myApp')
    .factory('MapService2', function() {
        var MapService = {};

        // Methods
        MapService.init = init;
        MapService.getMap = getMap;
        MapService.getLocation = getLocation;

        MapService.init();

        function init() {
          MapService.secure = (location.protocol === 'https:') ? true : false;
        	MapService.platform = new H.service.Platform({
		        'app_id': 't6ldZeZcFyWw3GWaYi6G',
		        'app_code': 'ogKY0Ip_sKJro3CZe28-DA',
             'useHTTPS': 'secure'
		    });
			MapService.mapTypes = MapService.platform.createDefaultLayers();
      MapService.geocoder = MapService.platform.getGeocodingService();
      MapService.router = MapService.platform.getRoutingService()
      MapService.objContainer = new H.map.Group()
      MapService.pattern_time = 0
      MapService.trafficTileProvider = new H.map.provider.ImageTileProvider({
          label: "Tile Info Overlay",
            descr: "",
          min: 8,
          max: 20,
       getURL: function( col, row, level )
         {
        return ["https://",
          "tiles.traffic.cit.api.here.com/traffic/6.0/tiles/",
        level,
        "/",
        col,
        "/",
        row,
        "/256/png8",
        "?style=fleet",
        "&app_code=",
        'ogKY0Ip_sKJro3CZe28-DA',
        "&app_id=",
        't6ldZeZcFyWw3GWaYi6G',
        "&pattern_time=",
        MapService.pattern_time
        ].join("");
      }
     });
      MapService.trafficLayer = new H.map.layer.TileLayer(MapService.trafficTileProvider);

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
            start();
            heatMapStart();
            loadAsset();
            MapService.map.addEventListener("mapviewchangeend", displayReady);
            MapService.map.addEventListener("mapviewchangeend", function()
            		{
            			requestTraffic(MapService.map.getViewBounds());
            		}
            	);41.8781,-87.6298
              MapService.strip2 = new H.geo.Strip()
              routeArr2 = [
                  41.883404, -87.624454,
                  41.883504, -87.623754,
                  41.883704, -87.623454,
                  41.884404, -87.622454,
                  41.886404, -87.621426, 
                  41.887404, -87.620426,
                  41.887704, -87.620000,
                  41.887904, -87.617000,
                  41.888404, -87.614454]
              for(i = 0; i < routeArr2.length; i += 2)
	             {
		               MapService.strip2.pushPoint(new H.geo.Point(routeArr2[i], routeArr2[i+1]));
	                }
        }


       //Route, start and destination container
       function start(){



       MapService.map.addObject(MapService.objContainer);
       MapService.map.addLayer(MapService.trafficLayer);
     }
     function heatMapStart(){
     MapService.heatmapProvider = new H.data.heatmap.Provider({
		type: "value",
		colors: new H.data.heatmap.Colors({
			0 :'rgb(51,255,0)',
			0.1: 'rgb(102,255,0)',
			0.2: 'rgb(255,102,0)',
			0.3: 'rgb(153,255,0)',
			0.4: 'rgb(204,255,0)',
			0.5: 'rgb(255,255,0)',
			0.6: 'rgb(255,204,0)',
			0.7: 'rgb(255,102,0)',
			0.8: 'rgb(255,51,0)',
			0.9: 'rgb(255, 0, 0)',
			1.0: 'rgb(0,0,0)'}, true),
		coarseness: 1,
		dataMax: 5,
		min: 10
	});

	MapService.heatmapLayer = new H.map.layer.TileLayer(MapService.heatmapProvider, {
		opacity: 0.4
	});

	MapService.map.addLayer(MapService.heatmapLayer);
  }
     /*
	      Start calculation
	       */





  /**
  function calculate() {
		// remove old route if recalculated
		MapService.objContainer.removeAll();

		// geocode address if necessary
		if (!isCoordinate(start.value)) {
			MapService.geocoder.geocode(
				{
					searchText: start.value,
					jsonattributes : 1
				},
				onStartGeocodeSuccess,
				onError
			);
		} else {
			onDestinationGeocode();
		}
	}

  function onStartGeocodeSuccess(result) {
		var pos = result.response.view[0].result[0].location.displayPosition;
		startCoord = pos.latitude + "," + pos.longitude;

		onDestinationGeocode();
	}
  **/
  //start
  function addRouteShapeToMap(route){
		var strip = new H.geo.Strip(),
		routeShape = route.shape;

		routeShape.forEach(function(point) {
			var parts = point.split(',');
			strip.pushLatLngAlt(parts[0], parts[1]);
		});

		mapRoute = new H.map.Polyline(strip, {
			style: {
				lineWidth: 4,
				strokeColor: 'rgba(0, 128, 255, 0.7)'
			}
		});
		// Add the polyline to the map and zoom into the route
		MapService.objContainer.addObject(mapRoute);
		map.setViewBounds(MapService.objContainer.getBounds(), true);
	}

	function isCoordinate(value) {
		return (value.replace(/ /g,'').match(/\d+\.\d+,\d+\.\d/g)) ? true : false;
	}
  //end
  function updateTrafficTiles()
	{
		var i = day_selector.options[day_selector.selectedIndex].value;
		weekday = parseInt(i) * 24 * 60 * 60;

		t = (Math.ceil(time_slider.value / 240 * 96) / 4);
		hour = Math.floor(t);
		h = t.toFixed(2);
		minutes = (h % 1) * 60;

		MapService.pattern_time = (hour * 60 * 60) + (minutes * 60) + weekday;

		// add leading zero to minutes string
		if(hour < 10)
			hour = "0" + hour;

		// format minutes from 0 to 00
		if(minutes === 0)
			minutes = "00";

		time = hour + ":" + minutes + ":00";

		time_output.innerHTML = "Time of Day: " + hour + ":" + minutes;

		td = new Date();
		date = new Date(td.getFullYear(),td.getMonth(),td.getDate()+(parseInt(day_selector.selectedIndex)-td.getDay() + 7));

		MapService.trafficTileProvider.reload(true);

		calculate();
	};
  var svgMarkerImage_Line='<svg width="__widthAll__" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
'<g>' +
'<rect id="label-box" ry="3" rx="3" stroke="#000000" height="30" width="__width__" y="11" x="45" fill="#ffffff"/>'+
'<text id="label-text" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="10" font-weight="bold" y="24" x="55" stroke-width="0" fill="#000000">__line1__</text>' +
'<text id="label-desc" xml:space="preserve" text-anchor="start" font-family="Sans-serif" font-size="8" y="36" x="55" stroke-width="0" fill="#000000">__line2__</text>'+
'<image width="50" height="50" x="8.5" y="9.5" xlink:href="data:image/png;base64,R0lGODlhfQDCAPQdAAELHgEMHgIMHw8LHRALHR8KGyAKGxEbLCEqOzE5SUBIVkFIV2Fnc3B1gHF2gYCFjoCFj4+UnJCVnZ+jqqCkq6+yuLCzuc/R1NDS1d/g4uDh4+/v8PDw8f///wAAAAAAACH5BAEAAB4ALAAAAAB9AMIAAAX+oCeOJCmcaKqubOu+cCyvZW2XxKzvfO+vhNvN8Csaj0eD0IRsOp+vpQdKrUKF1qy2aNt6v7MSEUwup5Qjs9o8yq3f3uAUTteK6vjqPc9v7vuAP3OBhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnCkICwoMEA4KCwidWgsSGB2trq+uFxEKqEcHHhUcsLu8HRsTHge1OwgTvcfIE6fDLwcQyNDIEMLMKs4b0dm9G9PVJwkZ2uK9GQnVDOPpvQzDEervuxGdBxXw9q8V1JgHF/f+rRf0VeL3r2DAS/UKFqxgSYLChxIooXv4kF2kBBQzmnt0IFzGhxkELnr2kSIERwf+sJV8uEEkIpIrH55chCDmx2WJKNjMSEHRgZ0fXQaaCLRiIgtFKfZEpDJpwQ2IFjiluOCQw6kKIxrqh9Xgoa4Pv4ItaKjm2H84AUk9668qobVs7bkNBDPuOweF6tpNN5PuXnh43/59N1ftYHWF+2A8PC4tIMbjxELOdojVZGgYrF6GprUQ3M28EgfSBXoXh6Oldy09RDR1K4uHfrp2JTSQztmrEZl17fiQ3st9fZLezKG2od+Mgy86oGGzhoubN0JqPRh2pKuDO09C+tfCpQOW42IwzjH82PGaDnAHa4H8JOxTtXOiDtQ6qgTNgWqQzszZ8I8cKOeNMyV14w0LCNz+VhAFvR1oDQMU/CcOBxQw4J6DKqhi3jGyiIZhD58s4MAoC5jy4Ykopqjiiiy26OKLMMYo44w01mgjIIPcqMMfOoaRY48x8AgkDCIMMGQMA6RxZBQjFLBkCwWU8CQLXUyJAhZWShEJAAIE0GUAYIYp5phenkAmmCpw2YIUIjjZiJpbwKlClGyOYOQiclYBQJ4nJFknloXwCcWeKfxp6KGIJiplFn4q6uijkNagRaORVmrpoYxeqummS2TK6aeg/ugEpaGWGqkVpJqqaqJjXLHqq47qAeush7bqBK24/klFrrwuYSsSvQZb5a3CFiuCG34Ya+wTyhqL7BHNLptstMHTEktttcBeiy202m7LRbe9Zgsur9yOm2u55uJqRLrkfsuuuoK8C68P8uL664710upDqvmaei+S/erLA78Bh/qsDAQXDOrACsN6MAwJN8zpDhFLrOnDLlRs8aX4bqxqxx6b6mPIIstA8qomn1wykSqv7ELLLq8Jc6ksz7wwkzbfLHPOn+LM86b/nvCzzjQMzWnQRvdMZdKbYsz0xEU/fenDUm8addWVHoy1pipszTEKGnuta59iWwp22WYLEDbaWqrNdqVuvw1p3HI/unbdeOetN6whAAA7" />'+
'</g>'+
'</svg>';
	var createIcon = function (line1, line2) {
		var div = document.createElement("div");

		var div = document.createElement("div");
		var svgMarker = "";

		if(line1 != "" && line2 != "")
		{
			svgMarker = svgMarkerImage_Line;
			svgMarker = svgMarker.replace(/__line1__/g, line1);
			svgMarker = svgMarker.replace(/__line2__/g, line2);
			svgMarker = svgMarker.replace(/__width__/g, line1.length  * 4 + 57);
			svgMarker = svgMarker.replace(/__widthAll__/g, line1.length  * 4 + 120);
		}
		else
		{
			svgMarker = svgMarkerBase64Image.replace(/__widthAll__/g, "60");
		}
		div.innerHTML = svgMarker;

		return new H.map.Icon(svgMarker, {
			anchor: new H.math.Point(24, 57)
		});
  };



  requestTraffic = function(bbox)
	{
		var url = 'http' + (MapService.secure ? 's' : '') + '://traffic.cit.api.here.com/traffic/6.1/flow.json?app_id=' + 't6ldZeZcFyWw3GWaYi6G' + '&app_code=' + 'ogKY0Ip_sKJro3CZe28-DA' +
				  '&bbox=' + bbox.getTop() + ',' + bbox.getLeft() + ';' +
				  bbox.getBottom() + ',' + bbox.getRight() +
				  '&i18n=true&responseattributes=simplifiedShape&units=metric&jsoncallback=updateTraffic';

		script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
	}

	updateTraffic = function(response)
	{

		dataPoints = new Array(),
			i = 0,
			j = 0,
			k = 0,
			l = 0,
			m = 0,
			n = 0;
		MapService.heatmapProvider.clear();

		if(response.RWS)
		{
			for(i = 0; i < response.RWS.length; i++)
			{
				if(response.RWS[i].RW)
				{
					for(j = 0; j < response.RWS[i].RW.length; j++)
					{
						if(response.RWS[i].RW[j].FIS)
						{
							for(k = 0; k < response.RWS[i].RW[j].FIS.length; k++)
							{
								if(response.RWS[i].RW[j].FIS[k])
								{
									for(l = 0; l < response.RWS[i].RW[j].FIS[k].FI.length; l++)
									{
										var FI = response.RWS[i].RW[j].FIS[k].FI[l],
											shp,
											JF,
											point;

										if(FI.SHP && FI.CF)
										{
											//! TODO why is CF an Array, might this should be changed
											JF = FI.CF[0].JF;
											for(m = 0; m < FI.SHP.length; m++)
											{
												var debugpoints = new Array();
												shp = FI.SHP[m].value[0].trim().split(" ");
												for(n = 0; n < shp.length; n++)
												{
													point = shp[n].split(',');
													dataPoints.push({'lat': point[0], 'lng': point[1], 'value': JF})
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		MapService.heatmapProvider.clear();
		// Add specified data to the heat map
		MapService.heatmapProvider.addData(dataPoints);
	}
  function loadAsset(){
    MapService.icon = new H.map.Icon('/assets/ambulance-pin-smaller.png');
		MapService.imageMarker = new H.map.Marker({ lat: 41.8781, lng: -87.6298 }, { icon: MapService.icon });
		MapService.imageMarker.$id = "marker";
		MapService.map.addObject(MapService.imageMarker);
  }
  var displayReady = function(e)
		{
			MapService.map.removeEventListener("mapviewchangeend", displayReady);
			startWalking();
		};

    var startWalking = function()
		{
			var walker = new Walker(MapService.imageMarker, MapService.strip2/*polyline.getStrip()*/);
			walker.walk();
		}
    var Walker = function (marker, path) {
			this.path = path;
			this.marker = marker;
			this.idx = 0;
			this.dir = -1;
			this.isWalking = false;
			var that = this;
			this.walk = function () {
				// Get the next coordinate from the route and set the marker to this coordinate
				var coord = path.extractPoint(that.idx);

				marker.setPosition(coord);

				// If we get to the end of the route reverse direction
				if (!that.idx || that.idx === path.getPointCount() - 1) {
					that.dir *= -1;
				}

				that.idx += that.dir;

				/* Recursively call this function with time that depends on the distance to the next point
				* which makes the marker move in similar random fashion
				*/
				// that.timeout = setTimeout(that.walk, Math.round(coord.distance(path.extractPoint(that.idx)) * 2.5));
				that.timeout = setTimeout(that.walk, 200);
				that.isWalking = true;
				var pixelcoord  = MapService.map.geoToScreen(coord),
				objects = MapService.map.getObjectsAt(pixelcoord.x, pixelcoord.y),
				covers = false
				//log = document.getElementById("log");
        //log.scrollTop = log.scrollHeight;

      };
    this.stop = function () {
      clearTimeout(that.timeout);
      this.isWalking = false;
      };
    };

		return MapService;
});
