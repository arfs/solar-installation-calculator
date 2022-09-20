import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';


class MapService {
  #geolocation;
  #raster;
  #vectorSource;
  #vector;
  #view;
  #map;

  create(targetEl = 'map') {
    const place = fromLonLat([-79.9458906, 32.8077378]);

    this.#raster = new TileLayer({
      source: new OSM(),
    });

    this.#vectorSource = new VectorSource({ wrapX: false });

    this.#vector = new VectorLayer({
      source: this.#vectorSource,
    });

    this.#view = new View({
      center: place,
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
      layers: [this.#raster, this.#vector],
      view: this.#view
    });

    //this.#geolocation.setTracking(true);
    //this.#geolocation.on('change:position', this.onChangePosition.bind(this));

    return this.#map;
  }

  getMap() {
    return this.#map;
  }

  getVectorSource() {
    return this.#vectorSource;
  }

  onChangePosition() {
    console.log(this.#geolocation.getPosition());
  }
}

export default MapService;