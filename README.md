<div id="top"></div>

<br />
  <h3 align="center">MyGIS</h3>

  <p align="center">
    A fast and responsive <strong>GIS!</strong>
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://jsfiddle.net/Cap_Anonymous123/68bny7eL/9/#&togetherjs=EAyC5vnn9p">View Demo</a>
    ·
    <a href="https://github.com/EziKielCroat/MojGIS/issues">Report Bug</a>
    ·
    <a href="https://github.com/EziKielCroat/MojGIS/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![example](https://user-images.githubusercontent.com/89482125/178540985-b4181c1b-25bc-4ba1-a2aa-8b6d695c2a66.png)

A little project I've been working on that is a GIS in the browser using only Javascript. The project is designed to be used only in the city Split. It features three modes, the "Putevi"(paths), "Mjesta"(places) and "Busevi"(buses). 

First mode(Paths):
*   Click on the button "Putevi" in the menu, wait for the map to reload. 
*   After that you check 2 points(start and end), it shows you a simple route and directions(you can minimize).
*   If you want to switch modes, simply click the menu again and wait for the map reload.

Second mode(Mjesta):
*   Click on the button "Mjesta" in the menu, wait for the map to reload. 
*   A small look-up will appear in the top right corner, simply type in your place/address and enter.

Third mode(Busevi):
*   Click on the button "Busevi" in the menu, wait for the map to reload. 
*   Select which bus you want to see.
*   After that every station that the bus goes to will show up, and the approximated location of the bus.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

  Built with Javascript, ArcGIS API was used for the entire mapping and routing.

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Simply, download the repo unpack and get your dev env. ready. After that, you can run the index.html on any web-server and it should work.

### Installation

1. Get a free API Key at (Sign-up required) [https://developers.arcgis.com/](https://developers.arcgis.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/EziKielCroat/MojGIS.git
   ```
4. Enter your API key in `utils.js` & `client.js`
   ```js
      esriConfig.apiKey = "YOUR-API-KEY";
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


## Roadmap

- [X] Add busevi functionaly
- [X] Map out the bus stations for at least 2-3 busses for the start.
- [] Possibly add a backend for the bus functionality?
- [50/50] Get better logic with reseting modes
- [] Look into self-hosting ArcGIS tutorial?
- [] ↑Look into improving the load time and responsiveness

See the [open issues](https://github.com/EziKielCroat/MojGIS/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the GNU GPLv3.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact


Project Link: [https://github.com/EziKielCroat/MojGIS/edit/main/](https://github.com/EziKielCroat/MojGIS/edit/main/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

* [ArcGIS](https://www.arcgis.com/index.html)

<p align="right">(<a href="#top">back to top</a>)</p>
