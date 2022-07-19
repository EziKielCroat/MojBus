function putBtnHandler(value) {
    if (value == true) {
        require(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet", ], function(esriConfig, Map, MapView, Graphic, route, RouteParameters, FeatureSet) {

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
                    addGraphic("origin", event.mapPoint);
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

                                features.forEach(function(result, i) {
                                    const direction = document.createElement("li");
                                    let m = result.attributes.length.toFixed(2) * 1609
                                    direction.innerHTML = result.attributes.text + " (" + m.toFixed(0) + " metara)";
                                    directions.appendChild(direction);
                                });

                                view.ui.empty("top-right");
                                view.ui.add(directions, "top-right");

                                document.getElementById("menu-bar").addEventListener("click", function() {
                                    if (view.graphics.length == 3) {
                                        view.graphics.removeAll(); // Reloading logic
                                        view.ui.empty("top-right");
                                        document.getElementById("menu").style.display = "none";
                                        location.reload();
                                    }

                                })
                            }
                        })
                        .catch(function(error) {
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
    ], function(esriConfig, Map, MapView, Search) {
        const map = new Map({
            basemap: "arcgis-navigation"
        });

        const view = new MapView({
            container: "map",
            map: map,
            center: [16.465, 43.51], // X, Y
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
            if (typeof finder === 'object' && !Array.isArray(finder) && finder !== null) {
                view.ui.remove(search);
                view.graphics.removeAll();
                view.ui.empty("top-right");
                document.getElementById("menu").style.display = "none";
                location.reload();
            }
        });
    });


}


function busBtnHolder() {

    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
    ], function(esriConfig, Map, MapView, Graphic, GraphicsLayer) {
        const map = new Map({
            basemap: "arcgis-navigation"
        });

        const view = new MapView({
            container: "map",
            map: map,
            center: [16.465, 43.51], // X, Y
            zoom: 12
        });

        esriConfig.apiKey = "YOUR-API-KEY";

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        document.getElementById("submit").addEventListener("click", function() {
            let selectValue = document.getElementById("bus-select").value
            document.getElementById("bus-box").style.display = "none";

            // if nest 
            if (selectValue == "") {
                alert("Odaberite neki bus.");
                document.getElementById("bus-box").style.display = "block";
            } else if (selectValue == "3-brda-lovrinac") {
                console.log("3-brda-lovrinac");
                tricaBrdaLovrinac(); //
            } else if (selectValue == "3-lovrinac-brda") {
                console.log("3-lovrinac-brda");
                tricaLovrinacBrda();
            } else if (selectValue == "6-kila-vukovarska-hnk-kila") {
                console.log("6-kila-vukovarska-hnk-kila");
                sesticaKilaHNK();
            } else if (selectValue == "7-znjan-spinut-zapadna") {
                console.log("7-znjan-spinut-zapadna");
                sedmicaZnjanZapadna();
            } else if (selectValue == "7-zapadna-spinut-znjan") {
                console.log("7-zapadna-spinut-znjan");
                sedmicaZapadnaZnjan();
            } else if (selectValue == "8-znjan-zvoncac") {
                console.log("8-znjan-zvoncac");
                osmicaZnjanZvoncac();
            } else if (selectValue == "8-zvoncac-znjan") {
                console.log("8-zvoncac-znjan");
                osmicaZvoncacZnjan();
            } else if (selectValue == "9-ravne-luka-ravne") {
                console.log("9-ravne-luka-ravne");
                devetkaRavneLuka();
            } else if (selectValue == "11-spinut-kampus-pujanke-ravne") {
                console.log("11-spinut-kampus-pujanke-ravne");
                jedanaeskaSpinutRavne();
            } else if (selectValue == "11-ravne-pujanke-kampus-spinut") {
                console.log("11-ravne-pujanke-kampus-spinut");
                jedanaeskaRavneSpinut();
            } else if (selectValue == "12-frane-bene") {
                console.log("12-frane-bene");
                dvanaeskaFraneBene();
            } else if (selectValue == "12-bene-frane") {
                console.log("12-bene-frane");
                dvanaeskaFraneBene();
            } else if (selectValue == "14-brda-kopilica-dubrovacka-bolnice-znjan-duilovo") {
                console.log("14-brda-kopilica-dubrovacka-bolnice-znjan-duilovo");
                alert("zasad nije podržan bus");
                cetrnaeskaBrdaDuilovo();
            } else if (selectValue == "14-duilovo-znjan-bolnice-dubrovacka-kopilica-brda") {
                console.log("14-duilovo-znjan-bolnice-dubrovacka-kopilica-brda");
                alert("zasad nije podržan bus");
                cetrnaeskaDuilovoBrda();
            } else if (selectValue == "15-duilovo-znjan-luka-duilovo") {
                console.log("15-duilovo-znjan-luka-duilovo");
                alert("zasad nije podržan bus");
                petnaeskaDuilovoZnjan();
            } else if (selectValue == "17-spinut-lora-kampus-trstenik") {
                console.log("17-spinut-lora-kampus-trstenik");
                alert("zasad nije podržan bus");
                sedamnaeskaSpinutTrstenik();
            } else if (selectValue == "17-trstenik-kampus-lora-spinut") {
                console.log("17-trstenik-kampus-lora-spinut");
                alert("zasad nije podržan bus");
                sedamnaeskaTrstenikSpinut();
            } else if (selectValue == "18-brnik-hnk-brnik") {
                console.log("18-brnik-hnk-brnik");
                alert("zasad nije podržan bus");
                osamnaeskaBrnikHnk();
            } else if (selectValue == "21-frane-meje-frane") {
                console.log("21-frane-meje-frane");
                alert("zasad nije podržan bus");
                dvadesetprvaFraneMeje();
            } else {
                alert("Ponovno pokrenite stranicu.");
            }

        });


        function tricaBrdaLovrinac() {

            let arrayX = ["16.473079", "16.473076", "16.469686", "16.468515", "16.462025", "16.456511", "16.448572", "16.444543", "16.442495", "16.442332", "16.443037", "16.44533", "16.449958", "16.457002", "16.460279", "16.465731", "16.470572", "16.491333", "16.491883", "16.475978"];
            let arrayY = ["43.521586", "43.523148", "43.523477", "43.522030", "43.521581", "43.521419", "43.519313", "43.516124", "43.512925", "43.507404", "43.502949", "43.503217", "43.504939", "43.50519", "43.505727", "43.506641", "43.507466", "43.50868", "43.51033", "43.508431"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);

                } else if (i == "18") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }
        }


        function tricaLovrinacBrda() {

            let arrayX = ["16.491836", "16.480458", "16.474460", "16.470459", "16.463651", "16.442580", "16.442767", "16.444784", "16.447585", "16.449494", "16.456468", "16.463603", "16.469568", "16.473130"];
            let arrayY = ["43.510286", "43.510800", "43.509065", "43.507680", "43.506555", "43.507221", "43.512877", "43.515943", "43.518219", "43.520837", "43.521241", "43.521475", "43.521976", "43.521529"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);

                } else if (i == "13") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function sesticaKilaHNK() {

            let arrayX = ["16.438540", "16.443036", "16.447719", "16.452547", "16.454918", "16.466891", "16.471950", "16.480533", "16.483494", "16.487147", "16.493139"];
            let arrayY = ["43.510792", "43.512329", "43.511325", "43.511018", "43.511255", "43.513181", "43.513928", "43.515978", "43.516519", "43.516340", "43.515601"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);

                } else if (i == "10") { // replace this
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function sedmicaZnjanZapadna() {

            let arrayX = ["16.482467", "16.479066", "16.476477", "16.473428", "16.470888", "16.467610", "16.460969", "16.455768", "16.451525", "16.447877", "16.443081", "16.436470", "16.433487", "16.427734", "16.423303", "16.427809", "16.431344"];
            let arrayY = ["43.506583", "43.506293", "43.508071", "43.511324", "43.514339", "43.516926", "43.518038", "43.516652", "43.516344", "43.520705", "43.521448", "43.521961", "43.518330", "43.513150", "43.504303", "43.502955", "43.505636"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);

                } else if (i == "16") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function sedmicaZapadnaZnjan() {

            let arrayX = ["16.482464", "16.428493", "16.427307", "16.428643", "16.424335", "16.428519", "16.430274", "16.434377", "16.434238", "16.438202", "16.445015", "16.449639", "16.452611", "16.457364", "16.462551", "16.468586", "16.471274", "16.473173", "16.479626"];
            let arrayY = ["43.506614", "43.503348", "43.503388", "43.505295", "43.504758", "43.514329", "43.516740", "43.518666", "43.521739", "43.521751", "43.520957", "43.518892", "43.515916", "43.516768", "43.517966", "43.516289", "43.513523", "43.511259", "43.505711"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else if (i == "1") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function osmicaZnjanZvoncac() {

            let arrayX = ["16.482469", "16.478038", "16.471092", "16.473339", "16.476483", "16.474503", "16.470459", "16.463662", "16.442585", "16.442794", "16.441094", "16.436400", "16.431035", "16.427779", "16.423311", "16.427795", "16.431304"];
            let arrayY = ["43.506602", "43.506053", "43.505337", "43.506621", "43.508073", "43.509092", "43.507687", "43.506551", "43.507236", "43.512951", "43.514484", "43.513834", "43.513123", "43.513119", "43.504287", "43.502948", "43.505641"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else if (i == "16") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function osmicaZvoncacZnjan() {

            let arrayX = ["16.428482", "16.427312", "16.428664", "16.424335", "16.429512", "16.435016", "16.437950", "16.442478", "16.442327", "16.443111", "16.445289", "16.447257", "16.449950", "16.457090", "16.460314", "16.465716", "16.471918", "16.475919", "16.479632"];
            let arrayY = ["43.503361", "43.503388", "43.505299", "43.504754", "43.513088", "43.512951", "43.513675", "43.512897", "43.507411", "43.502878", "43.503162", "43.505388", "43.504871", "43.505162", "43.505703", "43.506606", "43.507835", "43.508411", "43.505668"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else if (i == "18	") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function devetkaRavneLuka() {

            let arrayX = ["16.466510", "16.469552", "16.473114", "16.471853", "16.467653", "16.460964", "16.455760", "16.451517", "16.448572", "16.444559", "16.442424", "16.442322", "16.443100", "16.445283", "16.442585", "16.442800", "16.444752", "16.447542", "16.449618", "16.452627", "16.457305", "16.462578", "16.468340", "16.471961", "16.472535", "16.466510"];
            let arrayY = ["43.520672", "43.521994", "43.521512", "43.518529", "43.516918", "43.518034", "43.516642", "43.516362", "43.519295", "43.516097", "43.512849", "43.507398", "43.502873", "43.503064", "43.507231", "43.512962", "43.515926", "43.518202", "43.518836", "43.515938", "43.516735", "43.517972", "43.516860", "43.518416", "43.520158", "43.520672"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else if (i == "25") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function jedanaeskaSpinutRavne() {

            let arrayX = ["16.424048", "16.426819", "16.428509", "16.430287", "16.436153", "16.440812", "16.445066", "16.444589", "16.442505", "16.442319", "16.443076", "16.445283", "16.449943", "16.457031", "16.460266", "16.464539", "16.464271", "16.468192", "16.473396", "16.471925", "16.479176", "16.478717", "16.474310", "16.471952", "16.472537", "16.466489"];
            let arrayY = ["43.515070", "43.514152", "43.514329", "43.516768", "43.518264", "43.518455", "43.517299", "43.516099", "43.512897", "43.507388", "43.502951", "43.503101", "43.504933", "43.505184", "43.505723", "43.507283", "43.509594", "43.510009", "43.511289", "43.513994", "43.515817", "43.517046", "43.518243", "43.518425", "43.520155", "43.520674"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else if (i == "25") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function jedanaeskaRavneSpinut() {

            let arrayX = ["16.466489", "16.469536", "16.473119", "16.471851", "16.474691", "16.477617", "16.479181", "16.471239", "16.473216", "16.469488", "16.463697", "16.463635", "16.442542", "16.442794", "16.444758", "16.443937", "16.438926", "16.433471", "16.427152", "16.424029"];
            let arrayY = ["43.520674", "43.522006", "43.521534", "43.518495", "43.518188", "43.517134", "43.515920", "43.513524", "43.511275", "43.510059", "43.509151", "43.506542", "43.507243", "43.512946", "43.515953", "43.517972", "43.518595", "43.518241", "43.514055", "43.515090"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else if (i == "19") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        function dvanaeskaFraneBene() {

            let arrayX = ["16.435976", "16.432210", "16.428509", "16.423118", "16.417874", "16.407311", "16.402112", "16.395137", "16.389381", "16.402776"];
            let arrayY = ["43.508091", "43.506375", "43.503332", "43.503856", "43.504214", "43.505241", "43.506881", "43.508460", "43.508379", "43.513837"];

            for (let i = 0; i < arrayX.length; i++) {
                const point = {
                    type: "point",
                    longitude: arrayX[i],
                    latitude: arrayY[i],
                };

                if (i == "0") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else if (i == "9") {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [0, 0, 0], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                } else {
                    const markerZaStanice = {
                        type: "simple-marker",
                        color: [255, 186, 1], // Yellow
                        outline: {
                            color: [255, 255, 255], // White
                            width: 1
                        }
                    };
                    const pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerZaStanice
                    });
                    graphicsLayer.add(pointGraphic);
                }

            }

        }

        document.getElementById("menu-bar").addEventListener("click", function() {
            view.graphics.removeAll();
            graphicsLayer.removeAll();
            document.getElementById("bus-box").style.display = "none";
        });
    });
}
