let put = document.getElementById("put-btn");
let mjesto = document.getElementById("mjesto-btn");
let bus = document.getElementById("bus-btn");
let valueChanged = false;


document.getElementById("bus-select").value = "";

    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView"
      ], function(esriConfig, Map, MapView) {
  
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
