import { getArea } from 'ol/sphere';

class SolarInstallationCalculator {
  #lightIntensity = 1000;

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
    const lightIntensity = this.#lightIntensity; // W per meter squared
    return area * lightIntensity;
  }
}

export default SolarInstallationCalculator;