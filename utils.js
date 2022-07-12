

function putBtnHandler(value) {
if(value == true) {
      require(["esri/config","esri/Map","esri/views/MapView","esri/Graphic","esri/rest/route","esri/rest/support/RouteParameters","esri/rest/support/FeatureSet"], function(esriConfig, Map, MapView, Graphic, route, RouteParameters, FeatureSet) {

          const map = new Map({
            basemap: "arcgis-navigation"
          });
      
          const view = new MapView({
            container: "map",
            map: map,
            center: [16.465, 43.51], // X, Y
            zoom: 12,
          });

          esriConfig.apiKey = "YOUR-API-KEY";

          const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"; // Make sure your API key is in scope with Routing else this will throw errors.
    
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
                     let m = result.attributes.length.toFixed(2) * 1609 
                     direction.innerHTML = result.attributes.text + " (" + m.toFixed(0) + " metara)"; 
                     directions.appendChild(direction);
                   });
            
                  view.ui.empty("top-right");
                  view.ui.add(directions, "top-right");

                  document.getElementById("menu-bar").addEventListener("click", function() {
                    if(view.graphics.length == 3) {
                        view.graphics.removeAll(); // Reloading logic
                        view.ui.empty("top-right");
                        document.getElementById("menu").style.display = "none";
                        location.reload();
                      } 

                })
                 }
                })  
                .catch(function(error){
                    console.log(error);
                })  
            }
          })
      })
    } else {
      alert("Error 001")
    }
}

function mjestoBtnHolder() {
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Search"
      ], function(esriConfig,Map, MapView, Search) {
      const map = new Map({
          basemap: "arcgis-navigation"
        });
    
      const view = new MapView({
          container: "map",
          map: map,
          center: [16.465, 43.51],// X, Y
          zoom: 12
        });

      esriConfig.apiKey = "YOUR-API-KEY";
    
        const search = new Search({
            view: view,
            id: "finder"
          });
          view.ui.empty("top-right");
          view.ui.add(search, "top-right"); 
          document.getElementById("menu-bar").addEventListener("click", function() {
            let finder = view.ui.find("finder")
            if (typeof finder === 'object' &&!Array.isArray(finder) && finder !== null) {
                view.ui.remove(search); // Reloading logic
                view.graphics.removeAll();
                view.ui.empty("top-right");
                document.getElementById("menu").style.display = "none";
                location.reload();
            }
        });
      });
  

}
