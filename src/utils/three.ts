import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Engine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private globe: ThreeGlobe;

  height: number = window.innerHeight;
  width: number = window.innerWidth;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.height / this.width, 0.1, 1000);
    this.camera.position.z = 70;

    this.scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.height, this.width);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 0.2;
    this.controls.zoomSpeed = 0.8;
    this.controls.enableRotate = true;
    this.controls.enablePan = false;

    this.globe = new ThreeGlobe();
    this.scene.add(this.globe);
  }

  init(
    locations: {
      latitude: number;
      longitude: number;
    }[],
    geojson: { features: object[] },
  ) {
    const rLocations = locations.map((loc) => ({
      lat: loc.latitude,
      lng: loc.longitude,
      maxR: 5,
      propagationSpeed: 1,
      repeatPeriod: Math.random() * 2000 + 200,
    }));

    this.globe
      .showGlobe(false)
      .showAtmosphere(false)
      .hexPolygonsData(geojson.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)
      .hexPolygonUseDots(false)
      .hexPolygonColor(() => '#121212')
      .ringsData(rLocations)
      .ringColor(() => `rgba(255,100,50,1)`)
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod');

    this.animate();
  }

  animate() {
    this.globe.rotation.x += 0.001;
    this.globe.rotation.y += 0.001;
    this.globe.rotation.z += 0.001;
    this.controls.update();
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  canvas() {
    return this.renderer.domElement;
  }

  resize(height: number, width: number) {
    console.log(height, width);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

export default Engine;
