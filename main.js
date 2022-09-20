import './style.css';
import MapService from './src/mapService';
import SolarInstallationEstimatorTool from './src/solarInstallationEstimatorTool';
import SolarInstallationCalculator from './src/solarInstallationCalculator';

const mapService = new MapService();
const calculator = new SolarInstallationCalculator();
const uiConfig = {
  areaEl: 'area',
  nominalPowerEl: 'nominal-power'
};

new SolarInstallationEstimatorTool(mapService, calculator, uiConfig);