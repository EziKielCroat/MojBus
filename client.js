let put = document.getElementById("put-btn");
let mjesto = document.getElementById("mjesto-btn");
let bus = document.getElementById("bus-btn");
document.getElementById("bus-select").value = "";
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
  
      esriConfig.apiKey = "AAPKbe5eff22a2a948948d6e3187fdd67d6fKKYW43E8DoLoevr7zIJfInnNZbDIvukXwVWOKALJDtgpR1dInnoheujWTTBv8xSG"; // Replace this
  
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
             confirm("Odaberite početak i destinaciju"); // vjerovatno promjenit u zasebni styled window?
          }, 1250);
            putBtnHandler(valueChanged);
            menuOnClick();
        });

        mjesto.addEventListener("click", function() {
          mjestoBtnHolder();
          menuOnClick();
        });

        bus.addEventListener("click", function() {
          document.getElementById("bus-box").style.display = "block";
          busBtnHolder();
          menuOnClick();
        });


    });



    function menuOnClick() {
      document.getElementById("menu-bar").classList.toggle("change");
      document.getElementById("nav").classList.toggle("change");
      document.getElementById("menu-bg").classList.toggle("change-bg");
  }