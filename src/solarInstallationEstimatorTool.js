import { Draw, Modify } from 'ol/interaction';
import { Polygon } from 'ol/geom';

class SolarInstallationEstimatorTool {
  #areaTextEl;
  #nominalPowerTextEl;
  #resetButton;
  #calculator;
  #map;
  #drawInteraction;
  #mapService;
  #modifyInteraction;
  #uiConfig;

  constructor(mapService, calculator, uiConfig) {
    this.#calculator = calculator;
    this.#mapService = mapService;
    this.#uiConfig = uiConfig;

    this.#map = mapService.create();

    this.#areaTextEl = document.getElementById(this.#uiConfig.areaEl);
    this.#nominalPowerTextEl = document.getElementById(this.#uiConfig.nominalPowerEl);
    this.#resetButton = document.getElementById(this.#uiConfig.resetButtonEl);

    this.addDrawPolygonInteraction();
    this.#resetButton.addEventListener('click', this.onResetClick.bind(this));
  }

  addDrawPolygonInteraction() {
    this.#drawInteraction = new Draw({
      source: this.#mapService.getVectorSource(),
      type: 'Polygon'
    });

    this.#modifyInteraction = new Modify({source: this.#mapService.getVectorSource()});

    this.#map.addInteraction(this.#drawInteraction);
    this.#map.addInteraction(this.#modifyInteraction);

    this.#drawInteraction.on('drawstart', this.onPolygonDrawStart.bind(this));
    this.#drawInteraction.on('drawend', this.onPolygonDrawEnd.bind(this));
    this.#modifyInteraction.on('modifyend', this.onPolygonModifyEnd.bind(this));
  }

  onResetClick() {
    this.resetResults();
    this.#drawInteraction.abortDrawing();
  }

  onPolygonDrawStart(e) {
    this.resetResults();
  }

  onPolygonDrawEnd(e) {
    this.calculateEstimates(e.feature);
  }

  onPolygonModifyEnd(e) {
    this.calculateEstimates(e.features.getArray()[0]);
  }

  calculateEstimates(drawnFeature) {
    const drawnGeometry = drawnFeature.getGeometry();

    if(drawnGeometry instanceof Polygon) {
      let area = this.#calculator.getAreaInMetersSquared(drawnGeometry);
      let nominalPower = this.#calculator.getNominalPower(area);
      this.renderResults(area, nominalPower);
    }
  }

  resetResults() {
    this.#mapService.getVectorSource().clear()
    this.renderResults(0, 0);
  }

  renderResults(area, nominalPower) {
    let nominalPowerText = this.getNominalPowerWithUnits(nominalPower);
    this.#areaTextEl.innerHTML = area;
    this.#nominalPowerTextEl.innerHTML = nominalPowerText;
  }

  getNominalPowerWithUnits(nominalPower) {
    let result;

    if(nominalPower > 1000) {
      result = `${nominalPower / 1000} kW`;
    }
    else {
      result = `${nominalPower} W`;
    }

    return result;
  }
}

export default SolarInstallationEstimatorTool;