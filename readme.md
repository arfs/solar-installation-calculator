## Problem

The user needs to get an estimate of the nominal power produced by a solar installation given a certain area covered.


## Solution 

This application allows a user to browse a web map and draw a solar installation (polygon) over an arbitrary area. Once the drawing is finished, the application will display the area selected and an estimate of the nominal power produced by that by that solar installation.

The user can start a new one simply by drawing a new solar installation in another area or clicking the "Reset" button first. Clicking the "Reset" button also allows the user to abort the drawing.

---

## How to run locally

Clone from Github if needed

```bash
git clone https://github.com/arfs/solar-installation-calculator.git
```

Install required Node packages (run one time only)

```bash
cd solar-installation-calculator/
npm install
```

Run the app

```bash
npm start
```

---

## Third-Party Libraries

|name|description|
|-|-|
|[OpenLayers](https://openlayers.org/)|An open-source JavaScript library for displaying map data in web browsers. It provides an API for building rich web-based geographic applications.|
|[Vite](https://vitejs.dev/)|A new breed of frontend build tool that significantly improves the frontend development experience.|
|[Bootstrap](https://getbootstrap.com/)|Powerful, extensible, and feature-packed frontend toolkit.|

---

## Decisions

###  Mapping library
- Considered Google Maps, MapBox, and OpenLayers for the mapping library.
- Chose OpenLayers because:
    - It's free and open-source --being able to read the source code is helpful.
    - It supported drawing vector objects out-of-the-box.
    - The documentation seemed pretty good with lot examples.
- Almost chose MapBox at first because I thought it was free but it required a credit card when signing up for an API key
.
###  User Interface

- Kept it clean and minimal to match the aesthetics of OpenStreetMap.
- Chose fullscreen map mode because that's the default way it's displayed and it looks good.
- If user allows geolocation, it will center the view on their current location. Otherwise, it defaults the view to the location of the Palmetto HQ in Charleston, SC.
- Probably a little overkill to use Bootstrap just for header, table, and button styles only. I thought I was going to use more of it initially.


###  JavaScript

- Kept it simple and used vanilla javascript (i.e. no framework like jQuery) since the UI interaction outside of the vector drawings is very simple.
- Used EcmaScript (ES2019 to be exact) to match the style of the OpenLayers source code.

### Regarding comments in code
- Other than the JSDoc, I preferred to use minimal comments and instead wrote my code to be self-documenting via variable and method names (courtesy [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM/ref=sr_1_1?crid=KHNRYAIFS3V3&keywords=clean+code&qid=1663741317&sprefix=clean+cod%2Caps%2C256&sr=8-1) by Robert Martin).

---

## To-Do

- Add some unit tests.
- Implement some media queries so the calculator area is responsive.






