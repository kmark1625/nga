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
              routeArr2 = [41.5768541,-87.3477983,41.57532,-87.3476913,41.5744188,-87.3476055,41.57429,-87.3477235,41.5742257,-87.3480346,41.5738609,-87.3504701,41.5737,-87.3518648,41.5733244,-87.356725,41.5732708,-87.3587742,41.5732279,-87.3590317,41.5731313,-87.3592355,41.573024,-87.359375,41.5729382,-87.3594394,41.5722408,-87.3598149,41.5716293,-87.3601153,41.5705779,-87.3606625,41.5696981,-87.3611453,41.5678417,-87.3621216,41.5672734,-87.3624187,41.5662434,-87.3629692,41.5643659,-87.363924,41.5637758,-87.3641601,41.5635719,-87.3642341,41.5626493,-87.3643961,41.5624872,-87.3644712,41.5687189,-87.364675,41.5600421,-87.3648896,41.5583899,-87.3641222,41.5580251,-87.3641759,41.5571024,-87.3654583,41.5568128,-87.3655012,41.5568449,-87.3657265,41.5569941,-87.3674753,41.5570166,-87.3680117,41.5569941,-87.3684087,41.5567591,-87.3715737,41.5566733,-87.3725178,41.5565553,-87.3738911,41.5562334,-87.3742666,41.5538087,-87.3770872,41.5536799,-87.3771849,41.5536048,-87.3773876,41.5532079,-87.3780646,41.5530469,-87.3784616,41.5418967,-87.379159,41.5418216,-87.3796847,41.5417143,-87.3802104,41.5518239,-87.3824205,41.5516307,-87.382839,41.5514987,-87.3831072,41.5506008,-87.3845878,41.5496566,-87.3860791,41.5489807,-87.3873022,41.5487447,-87.3877099,41.5486041,-87.3879877,41.5482512,-87.3882248,41.5454067,-87.3904074,41.5436163,-87.3917868,41.5425649,-87.3926451,41.5416422,-87.393321,41.5411057,-87.3936858,41.5401294,-87.3945334,41.5395393,-87.3949947,41.5391531,-87.3941737,41.5382626,-87.3959281,41.5382948,-87.3960783,41.5385308,-87.397001,41.5395393,-87.4005308,41.5398183,-87.401593,41.5403333,-87.4033203,41.54058,-87.4042966,41.5406337,-87.4045327,41.5412667,-87.4079123,41.54-87311,-87.4083736,41.54-87311,-87.4086415,41.5410411,-87.4119463,41.5410092,-87.4123647,41.5409649,-87.4127065,41.5409126,-87.4871157,41.5408375,-87.487384,41.540741,-87.4879416,41.5405586,-87.4147894,41.5397325,-87.4201968,41.5394857,-87.4215808,41.5393033,-87.4228253,41.5390351,-87.4242941,41.5384879,-87.4258187,41.5384557,-87.4259367,41.538445,-87.4260547,41.538327,-87.4263551,41.5381231,-87.4269989,41.5371039,-87.4299707,41.5361276,-87.4327495,41.5360096,-87.4330606,41.5362349,-87.4333074,41.5366211,-87.4337795,41.5381768,-87.4355927,41.5396241,-87.4372556,41.5405478,-87.4383821,41.5411272,-87.4390581,41.5423717,-87.4404635,41.5430799,-87.44-87111,41.5443244,-87.4427381,41.5447428,-87.4434032,41.5449572,-87.4437893,41.5453222,-87.4445405,41.5456548,-87.4441701,41.5458694,-87.4456992,41.5462341,-87.4465146,41.5464058,-87.4469641,41.5473607,-87.4490359,41.548058,-87.4505916,41.5481868,-87.4509242,41.5482833,-87.4512246,41.5483906,-87.4516741,41.5486159,-87.4417588,41.5490022,-87.4544861,41.5490773,-87.4549046,41.5498497,-87.4584236,41.5500751,-87.4589386,41.5504935,-87.4607196,41.5509334,-87.4627581,41.5509441,-87.4631443,41.5509977,-87.4633696,41.5512767,-87.4641635,41.5411779,-87.4660947,41.5414569,-87.4665668,41.5417251,-87.4669101,41.5418324,-87.4670174,41.5530148,-87.4671462,41.5536478,-87.4674895,41.5538301,-87.4675753,41.5537336,-87.4685624,41.5536048,-87.4702575,41.5533141,-87.4751787,41.5532508,-87.4774877,41.553165,-87.4791946,41.5419289,-87.4788835,41.5416929,-87.4785187,41.5412101,-87.477875,41.558784,-87.476845,41.5506651,-87.4759545,41.5500751,-87.4753001,41.5494206,-87.4744096,41.5483048,-87.4730148,41.5480795,-87.4726715,41.5479186,-87.4723711,41.5476825,-87.4718239,41.5474679,-87.4712231,41.5472748,-87.4706223,41.5471246,-87.4700215,41.5467491,-87.4679401,41.5466955,-87.4676611,41.5454724,-87.4681439,41.5436914,-87.4687877,41.5430584,-87.4690344,41.5404164,-87.4699571,41.5403333,-87.4700322,41.5401402,-87.4701288,41.5393355,-87.4706641,41.538445,-87.4712982,41.5380266,-87.4715772,41.5378656,-87.4717059,41.5362992,-87.4731972,41.535001,-87.4743441,41.534765,-87.4745705,41.5344324,-87.4748602,41.5330591,-87.4759653,41.5329304,-87.4760725,41.532984,-87.4764588,41.5330698,-87.477596,41.5334346,-87.4837544,41.5334883,-87.4849453,41.5340784,-87.4947085,41.534872,-87.4964788,41.5341642,-87.4985816,41.5342071,-87.4997296,41.5339067,-87.4998047,41.533-8742,-87.4999228,41.5324583,-87.4999657,41.5317287,-87.5000837,41.5314149,-87.5000944,41.5311708,-87.5000837,41.4174694,-87.4998477,41.4163429,-87.4998047,41.4146669,-87.4996911,41.4116436,-87.4994936,41.4104206,-87.499397,41.5192189,-87.4993434,41.518146,-87.4992468,41.5167587,-87.4988928,41.5160539,-87.4986889,41.5156999,-87.4985924,41.515775,-87.4978414,41.5162041,-87.4934747,41.5163007,-87.492434,41.5161505,-87.4922087,41.5151849,-87.4906841,41.515099,-87.4905672,41.5149596,-87.490417,41.5145948,-87.4902561,41.5144231,-87.4902024,41.5148735,-87.4901166,41.5874897,-87.4900093,41.5122441,-87.4897089,41.512095,-87.489666,41.5118053,-87.4922945,41.5114191,-87.4970582,41.5111616,-87.4997833,41.5107753,-87.5030448,41.5106251,-87.5047615,41.5104186,-87.504622,41.5097024,-87.5034955,41.5095308,-87.5040426,41.5087047,-87.5033774,41.5069773,-87.5019934,41.5050676,-87.5004056,41.5029969,-87.4987533,41.5007546,-87.4968865,41.5006795,-87.4969079,41.5006258,-87.4967685,41.5005615,-87.4966397,41.5004649,-87.4965324,41.5001741,-87.4962857,41.4999177,-87.4970796,41.499392,-87.4986889,41.4991916,-87.4993002,41.4989951,-87.4999087,41.4971068,-87.4989893,41.4972355,-87.4982276,41.4972034,-87.4981203,41.4971497,-87.4980774,41.4966455,-87.4978199,41.49686,-87.4967148,41.4969877,-87.4966397,41.4969673,-87.4966397,41.4982119,-87.4972298,41.4996388,-87.4979165,41.4999177,-87.4970796,41.5001741,-87.4962857,41.5003362,-87.4957063,41.5005937,-87.4947944,41.5087661,-87.4910071,41.5015593,-87.4903097,41.5018704,-87.4893548,41.5020742,-87.4886146,41.5024283,-87.4871447,41.5024498,-87.486973,41.5024498,-87.4867907,41.5022459,-87.4866726,41.5021279,-87.4865654,41.5020206,-87.4864044,41.5003362,-87.4830248,41.5003147,-87.4828639,41.4997879,-87.4816515,41.4995841,-87.4814048,41.4994671,-87.4812438,41.4991667,-87.4806741,41.4990594,-87.4805036,41.4983728,-87.4820378,41.4968278,-87.485353,41.4960339,-87.4871125,41.4956906,-87.4877777,41.495358,-87.4881747,41.4943495,-87.4892261,41.4922895,-87.4914362,41.4908304,-87.4929919,41.4889743,-87.4949231,41.4879014,-87.4960067,41.486614,-87.49738,41.4856591,-87.4983456,41.4842322,-87.4998369,41.4828598,-87.5087794,41.4825799,-87.5017241,41.4825048,-87.5017788,41.4823976,-87.5018539,41.4805307,-87.5028303,41.4808738,-87.5029161,41.480005,-87.5029697,41.4795973,-87.503195,41.4789751,-87.5036242,41.478106,-87.504107,41.4779773,-87.504225,41.477237,-87.5050082,41.475574,-87.5068429,41.4728918,-87.5097396,41.4720087,-87.5107267,41.4711537,-87.5116816,41.4689865,-87.5140741,41.4687827,-87.514353,41.4687183,-87.5144496,41.4686539,-87.5145783,41.4686861,-87.5146642,41.4692118,-87.515383,41.4694157,-87.5156512,41.4695873,-87.5158443,41.472012,-87.5183978,41.4726343,-87.5189235,41.4729873,-87.5192872,41.4751985,-87.4116165,41.4777305,-87.4143309,41.4780095,-87.414414,41.4802411,-87.4148721,41.4807243,-87.4141611];
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
