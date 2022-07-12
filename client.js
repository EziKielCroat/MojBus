let put = document.getElementById("putBtn");
let valueChanged = false;

    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/rest/route",
        "esri/rest/support/RouteParameters",
        "esri/rest/support/FeatureSet"
      ], function(esriConfig, Map, MapView, Graphic, route, RouteParameters, FeatureSet) {
  
      esriConfig.apiKey = "YOUR-API-KEY"; // Replace this
  
      const map = new Map({
        basemap: "arcgis-navigation"
      });
  
      const view = new MapView({
        container: "map",
        map: map,
        center: [16.465, 43.51], // X, Y
        zoom: 12,
      });

        put.addEventListener("click", function() {
            valueChanged = true;
            setTimeout(function(){
             valueChanged = false;
             confirm("Odaberite početak i destinaciju");
          }, 1250);
            putBtnHandler(valueChanged);
            menuOnClick();
        });

        document.getElementById("mjestoBtn").addEventListener("click", function() {
          mjestoBtnHolder();
          menuOnClick();
        });
    });

    function menuOnClick() {
      document.getElementById("menu-bar").classList.toggle("change");
      document.getElementById("nav").classList.toggle("change");
      document.getElementById("menu-bg").classList.toggle("change-bg");
  }
