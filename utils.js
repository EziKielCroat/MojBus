

function putHandlerTester() {
        require([
            "esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/Graphic",
            "esri/rest/route",
            "esri/rest/support/RouteParameters",
            "esri/rest/support/FeatureSet"
          ], function(esriConfig, Map, MapView, Graphic, route, RouteParameters, FeatureSet) {
      
          esriConfig.apiKey = "AAPK212275a161804b0099e037c6a1784b06LDUTjLaXmcySkwIYjxewuk6diGTWo5sQt_3JfgR31U2vcqEFR_VQsniBaeDaOmqG";
      
          const map = new Map({
            basemap: "arcgis-navigation"
          });
      
          const view = new MapView({
            container: "map",
            map: map,
            center: [16.465, 43.51], // X, Y
            zoom: 12,
          });
    
          const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    
          view.on("click", function(event) {
            if (view.graphics.length === 0) {
                addGraphic("origin", event.mapPoint);
              } else if (view.graphics.length === 1) {
                addGraphic("destination", event.mapPoint);
                getRoute(); 
              } else {
                view.graphics.removeAll();
                addGraphic("origin",event.mapPoint);
              }
            
            function addGraphic(type, point) {
              const graphic = new Graphic({
                symbol: {
                  type: "simple-marker",
                  color: (type === "origin") ? "white" : "black",
                  size: "8px"
                },
                geometry: point
              });
              view.graphics.add(graphic);
            }


            
            function getRoute() {
              const routeParams = new RouteParameters({
                stops: new FeatureSet({
                  features: view.graphics.toArray()
                }),
                directionsLanguage: "hr",
                returnDirections: true
            
              });

              route.solve(routeUrl, routeParams)
                .then(function(data) {
                  data.routeResults.forEach(function(result) {
                    result.route.symbol = {
                      type: "simple-line",
                      color: [5, 150, 255],
                      width: 3
                    };
                    view.graphics.add(result.route);
                  });
            
                 if (data.routeResults.length > 0) {
                   const directions = document.createElement("ol");
                   directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
                   directions.style.marginTop = "0";
                   directions.style.padding = "15px 15px 15px 30px";
                   const features = data.routeResults[0].directions.features;
            
                   features.forEach(function(result,i){
                     const direction = document.createElement("li");
                     let km = result.attributes.length.toFixed(2) * 1.60 // pretvaranje miles into km
                     console.log(km);
                     direction.innerHTML = result.attributes.text + " (" + km.toFixed(2) + " kilometara)"; // change to meters?
                     directions.appendChild(direction);
                   });
            
                  view.ui.empty("top-right");
                  view.ui.add(directions, "top-right");

                  document.getElementById("menu-bar").addEventListener("click", function() {
                    if(view.graphics.length == 3) {
                        view.graphics.removeAll();
                        view.ui.remove(directions);
                        menuOnClick();
                        menuOnClick();
                        window.stop();
                  } 
                })
    
            
                 }
            
                })  
            
                .catch(function(error){
                    console.log(error);
                })  
            }
            return undefined;
          })
      })
    }

    function menuOnClick() {
        document.getElementById("menu-bar").classList.toggle("change");
        document.getElementById("nav").classList.toggle("change");
        document.getElementById("menu-bg").classList.toggle("change-bg");
    }