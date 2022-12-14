import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';

class MapService {
  #geolocation;
  #tileLayer;
  #vectorLayer;
  #vectorSource;
  #view;
  #map;

  create(targetEl = 'map') {
    const charlestonScCoordinates = fromLonLat([-79.9458906, 32.8077378]); 

    this.#tileLayer = new TileLayer({
      source: new OSM(),
    });

    this.#vectorSource = new VectorSource({ wrapX: false });

    this.#vectorLayer = new VectorLayer({
      source: this.#vectorSource,
    });

    this.#view = new View({
      center: charlestonScCoordinates,
      zoom: 18
    });

    this.#geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.#view.getProjection(),
    });

    const map = this.#map = new Map({
      target: targetEl,
      layers: [this.#tileLayer, this.#vectorLayer],
      view: this.#view
    });

    // default the view to Charleston, SC but center to the user's coordinates if geolcation is allowed by user
    this.#geolocation.setTracking(true);
    this.#geolocation.on('change:position', this.onChangePosition.bind(this));

    return this.#map;
  }

  getMap() {
    return this.#map;
  }

  getVectorSource() {
    return this.#vectorSource;
  }

  onChangePosition() {
    this.#view = new View({
      center: this.#geolocation.getPosition(),
      zoom: 18
    });

    this.#map.setView(this.#view);
    this.#geolocation.setTracking(false); // to prevent the map view from jumping when it thinks the position has changed:w
    
  }
}

export default MapService;
