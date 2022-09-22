## Problem

The user needs to get an estimate of the nominal power produced by a solar installation given a certain area covered.


## Solution 

This application was created to allow a user to:

- Browse a web map and draw a solar installation (polygon) over an arbitrary area.
- Display the area selected and estimated nomimal power of the solar installation.
- Start a new drawing by clicking on the "Reset" button or simply by beginning a new drawing.
- Modify an existing drawing by dragging its edges and vertices.
- Abort an existing drawing by clicking on the "Reset" button.

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

## How to run unit tests

If you just want to run the tests 

```bash
npm run test
```

If you want to write unit tests and have the tests run every time you save the file (ex: for TDD workflow)

```bash
npm run test:run
```

---

## Third-Party Libraries

|name|description|
|-|-|
|[OpenLayers](https://openlayers.org/)|An open-source JavaScript library for displaying map data in web browsers. It provides an API for building rich web-based geographic applications.|
|[Vite](https://vitejs.dev/)|A new breed of frontend build tool that significantly improves the frontend development experience.|
|[Vitest](https://vitest.dev/)|A Vite-native unit test framework.|
|[Bootstrap](https://getbootstrap.com/)|Powerful, extensible, and feature-packed frontend toolkit.|

---

## Decisions

### Nominal power calculation

The nominal power of the solar installation is calculated under the following Standard Test Conditions:

- a light intensity of 1.000 W/m²
- sunlight hitting the positioned solar cells perpendicularly
- a standard airmass (AM) of 1,5. This is a measure for the relative length of the optical path through the atmosphere.
- a temperature of 25°C at the solar cells

Additionally, I am assuming the solar panels have an efficiency of 25%.

###  Mapping library

- Considered Google Maps, MapBox, and OpenLayers for the mapping library.
- Chose OpenLayers because:
    - It's free and open-source --being able to read the source code is helpful.
    - It supported drawing vector objects out-of-the-box.
    - The documentation seemed pretty good with lots of examples.
- Almost chose MapBox at first because I thought it was free but it required a credit card when signing up for an API key
.
###  User Interface

- Kept it clean and minimal to match the aesthetics of OpenStreetMap.
- Chose fullscreen map mode because that's the default styling from the boilerplate code and it feels more immersive.
- If user allows geolocation, it will center the view on their current location. Otherwise, it defaults the view to the location of the Palmetto HQ in Charleston, SC.
- Probably a little overkill to use Bootstrap just for header, table, and button styles only. I thought I was going to use more of it initially.
- The calculator UI was placed on the bottom left because it was the only corner that didn't already have something it (top left: zoom controls, top right: reset map orientation appears if you rotate map, bottom  right: OpenStreetMap copyright). Also styled it to look like a default control.
- The calculator UI could also have been done as an actual OpenLayer control but I didn't see that in the documentation until I was finished with everything.


###  JavaScript

- Kept it simple and used vanilla javascript (i.e. no framework like jQuery) since the UI interaction outside of the vector drawing is very simple.
- Used EcmaScript (ES2019 to be exact) to match the style of the OpenLayers source code.
- Started adding some JSDoc but stopped because I thought it was a little too time-consuming for the purpose of this demo (sorry).

### Regarding comments in code
- I preferred to use minimal comments and instead wrote my code to be self-documenting via variable and method names (courtesy [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM/ref=sr_1_1?crid=KHNRYAIFS3V3&keywords=clean+code&qid=1663741317&sprefix=clean+cod%2Caps%2C256&sr=8-1) by Robert Martin).

---

## Software Architecture

|Class name|Responsiblity|
|-|-|
|MapService|Configures and renders the web-based map that the user can browse.|
|SolarInstallationCalculator|Handles calculations for area and nominal power of the solar installation.|
|SolarInstallationEstimatorTool|Handles all the user interactions and renders calculated results. Has dependencies on the two classes above.|