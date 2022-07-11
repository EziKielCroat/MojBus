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

        document.getElementById("putBtn").addEventListener("click", function() {
            putHandlerTester();
            menuOnClick();
        });
    });


    function menuOnClick() {
      document.getElementById("menu-bar").classList.toggle("change");
      document.getElementById("nav").classList.toggle("change");
      document.getElementById("menu-bg").classList.toggle("change-bg");
  }