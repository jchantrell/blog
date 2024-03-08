import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type GeoJson = {
  type: string;
  name: string;
  bbox: number[];
  crs: { type: string; properties: { name: string } };
  features: Feature[];
};

type Feature = {
  type: string;
  bbox: number[];
  properties: { [key: string | number]: any };
  geometry: { type: string; coordinates: number[][][] | number[][][][] };
};

const darkThemeHex = 'rgba(100,94,94,1)';
const lightThemeHex = `rgba(255,255,255,1)`;

class Engine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private globe: ThreeGlobe | undefined;

  active: boolean = false;
  height: number = window.innerHeight;
  width: number = window.innerWidth;
  hexColor: string = lightThemeHex;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.height / this.width, 0.1, 1000);
    this.camera.position.z = 70;

    this.scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.height, this.width);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 0.2;
    this.controls.enableRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
  }

  init(geojson: GeoJson, theme: 'light' | 'dark', curtainElement: HTMLElement) {
    this.globe = new ThreeGlobe({ animateIn: false });
    this.globe.onGlobeReady(() => this.easeIn(curtainElement));
    this.globe
      .showGlobe(false)
      .showAtmosphere(false)
      .hexPolygonsData(geojson.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)
      .hexPolygonUseDots(false)
      .ringColor(() => '#00e031');

    this.scene.add(this.globe);
    this.active = true;
    this.setTheme(theme);
    this.animate();
  }

  animate() {
    if (this.globe) {
      this.globe.rotation.x += 0.001;
      this.globe.rotation.y += 0.001;
      this.globe.rotation.z += 0.001;
    }
    this.controls.update();
    requestAnimationFrame(() => {
      if (this.active) this.animate();
    });
    this.renderer.render(this.scene, this.camera);
  }

  stop() {
    this.active = false;
    this.renderer.dispose();
    this.cleanObjects();
  }

  setTheme(theme: 'light' | 'dark') {
    if (this.globe) {
      this.globe.hexPolygonColor(() => (theme === 'dark' ? darkThemeHex : lightThemeHex));
    }
  }

  easeIn(curtainElement: HTMLElement) {
    setTimeout(() => {
      curtainElement.classList.add('transition-opacity', 'ease-in', 'duration-1000', 'opacity-0');
    }, 200);
  }

  canvas() {
    return this.renderer.domElement;
  }

  resize(height: number, width: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  cleanObjects() {
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh === false) {
        return;
      }

      object.geometry.dispose();

      if (object.material.isMaterial) {
        return this.cleanMaterial(object.material);
      }

      for (const material of object.material) {
        return this.cleanMaterial(material);
      }
    });
  }

  cleanMaterial(material: THREE.Material) {
    material.dispose();
    for (const key of Object.keys(material)) {
      const value = material[key as keyof THREE.Material];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        value.dispose();
      }
    }
  }
}

export default Engine;
