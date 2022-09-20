import Draw from 'ol/interaction/Draw';
import { Polygon } from 'ol/geom';

class SolarInstallationEstimatorTool {
  #calculator;
  #map;
  #draw;
  #mapService;
  #uiConfig;

  constructor(mapService, calculator, uiConfig) {
    this.#calculator = calculator;
    this.#mapService = mapService;
    this.#uiConfig = uiConfig;

    this.#map = mapService.create();
    this.addDrawPolygonInteraction();
  }

  addDrawPolygonInteraction() {

      this.#draw = new Draw({
        source: this.#mapService.getVectorSource(),
        type: 'Polygon'
      });

      this.#map.addInteraction(this.#draw);
      this.#draw.on('drawend', this.onPolygonDrawEnd.bind(this));
  }

  onPolygonDrawEnd(e) {
    const sketch = e.feature;
    const geometry = sketch.getGeometry();

    if(geometry instanceof Polygon) {
      let area = this.#calculator.getAreaInMetersSquared(geometry);
      let nominalPower = this.#calculator.getNominalPower(area);

      document.getElementById('area').innerHTML = area;
      document.getElementById('nominal-power').innerHTML = nominalPower;
    }
  };
}

export default SolarInstallationEstimatorTool;