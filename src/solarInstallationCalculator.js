import { getArea } from 'ol/sphere';

class SolarInstallationCalculator {
  #lightIntensity;        // unit is Watts per meter squared
  #solarPanelEfficiency;  // unit is decimal pecentage

  constructor(solarPanelEfficiency = 0.25, lightIntensity = 1000) {
    this.#lightIntensity = lightIntensity;
    this.#solarPanelEfficiency = solarPanelEfficiency;
  }

  /**
   * Format area output.
   * @param {Polygon} polygon The polygon.
   * @return {Number} Formatted area.
   */
  getAreaInMetersSquared(polygon) {
    const area = getArea(polygon);
    let result = Math.round(area * 100) / 100;
    return result;
  }

  /**
   * Calculate nominal power
   * @param {Number} area The area in meters squared
   * @return {Number} Nominal power in watts
   */
  getNominalPower(area) {
    return area * this.#lightIntensity * this.#solarPanelEfficiency;
  }
}

export default SolarInstallationCalculator;