import {
  AmbientLight,
  type Material,
  MathUtils,
  Mesh,
  PerspectiveCamera,
  Scene,
  Spherical,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import ThreeGlobe from './three-globe.mjs';

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
  properties?: { [key: string | number]: string };
  geometry: { type: string; coordinates: number[][][] | number[][][][] };
};

const darkThemeHex = 'rgba(100,94,94,1)';
const lightThemeHex = `rgba(255,255,255,1)`;

class Engine {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private globe: InstanceType<typeof ThreeGlobe> | undefined;

  active: boolean = false;
  height: number = window.innerHeight;
  width: number = window.innerWidth;
  hexColor: string = lightThemeHex;

  target: Vector3;
  spherical: Spherical;
  sphericalDelta: Spherical;

  rotationVelocity: Vector2;
  baseRotationSpeed: Vector2;
  dampingFactor: number;
  sensitivity: number;
  minDistance: number;
  maxDistance: number;
  distance: number;
  dragVelocity: number;

  isMouseDown: boolean;
  mouseStart: Vector2;
  mouseCurrent: Vector2;
  mouseDelta: Vector2;

  isTouchActive: boolean;

  constructor() {
    this.rotationVelocity = new Vector2(0, 0);
    this.baseRotationSpeed = new Vector2(0.001, 0);
    this.dampingFactor = 0.99;
    this.sensitivity = 0.002;
    this.minDistance = 1;
    this.maxDistance = 100;
    this.distance = 70;
    this.dragVelocity = 10;
    this.spherical = new Spherical(this.distance, 1.6331929866180652, 18.61175353355659); // magic numbers for indian ocean starting point

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(70, this.width / this.height, 0.1, 1000);
    this.camera.position.z = 70;

    this.scene.add(new AmbientLight(0xcccccc, Math.PI));

    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.width, this.height);

    this.target = new Vector3();
    this.sphericalDelta = new Spherical();

    this.isMouseDown = false;
    this.mouseStart = new Vector2();
    this.mouseCurrent = new Vector2();
    this.mouseDelta = new Vector2();

    this.isTouchActive = false;

    window.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', (e) => this.onMouseUp(e));
    window.addEventListener('touchstart', (e) => this.onTouchStart(e));
    window.addEventListener('touchmove', (e) => this.onTouchMove(e));
    window.addEventListener('touchend', (e) => this.onTouchEnd(e));
  }

  async init(geojson: GeoJson, theme: 'light' | 'dark', curtainElement: HTMLElement) {
    this.globe = new ThreeGlobe({ animateIn: false })
      .onGlobeReady(() => this.easeIn(curtainElement))
      .showGlobe(false)
      .showAtmosphere(false)
      .hexPolygonsData(geojson.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)
      .hexPolygonUseDots(false);

    this.globe.scale.set(-1, 1, 1);

    this.scene.add(this.globe);
    this.active = true;
    this.setTheme(theme);
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => {
      if (this.active) {
        this.updateCamera();
        this.animate();
      }
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
    curtainElement.classList.add('transition-opacity', 'ease-in', 'duration-1500', 'opacity-0');
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
      if (object instanceof Mesh === false) {
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

  cleanMaterial(material: Material) {
    material.dispose();
    for (const key of Object.keys(material)) {
      const value = material[key as keyof Material];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        value.dispose();
      }
    }
  }

  updateCamera() {
    this.spherical.theta += this.sphericalDelta.theta;
    this.spherical.phi += this.sphericalDelta.phi;

    if (!this.isMouseDown && !this.isTouchActive) {
      this.spherical.theta += this.baseRotationSpeed.x;
      this.spherical.phi += this.baseRotationSpeed.y;

      this.spherical.theta += this.rotationVelocity.x * 0.02;
      this.spherical.phi += this.rotationVelocity.y * 0.02;

      this.rotationVelocity.multiplyScalar(this.dampingFactor);

      if (this.rotationVelocity.length() < 0.001) {
        this.rotationVelocity.set(0, 0);
      }
    }

    this.spherical.phi = MathUtils.clamp(this.spherical.phi, 0.1, Math.PI - 0.1);
    this.sphericalDelta.set(0, 0, 0);
    const position = new Vector3().setFromSpherical(this.spherical);
    position.add(this.target);
    this.camera.position.copy(position);
    this.camera.lookAt(this.target);
  }

  onMouseDown(event: MouseEvent) {
    if (event.target !== this.renderer.domElement) return;

    this.isMouseDown = true;
    this.mouseStart.set(event.clientX, event.clientY);
    this.mouseCurrent.copy(this.mouseStart);
    this.rotationVelocity.set(0, 0);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;

    const previousMouse = this.mouseCurrent.clone();
    this.mouseCurrent.set(event.clientX, event.clientY);

    this.mouseDelta.subVectors(this.mouseCurrent, previousMouse);

    const deltaTheta = -this.mouseDelta.x * this.sensitivity;
    const deltaPhi = -this.mouseDelta.y * this.sensitivity;

    this.sphericalDelta.theta += deltaTheta;
    this.sphericalDelta.phi += deltaPhi;

    this.rotationVelocity.set(deltaTheta * this.dragVelocity, deltaPhi * this.dragVelocity);

    this.updateCamera();
  }

  onMouseUp(_event: MouseEvent) {
    this.isMouseDown = false;

    const totalDrag = new Vector2().subVectors(this.mouseCurrent, this.mouseStart);
    const dragMagnitude = totalDrag.length();

    if (dragMagnitude > 5) {
      this.rotationVelocity.multiplyScalar(1.2);
      const rotationDirection = this.rotationVelocity.clone().normalize();
      this.baseRotationSpeed.x = rotationDirection.x * 0.001;
      this.baseRotationSpeed.y = rotationDirection.y * 0.001;
    }
  }

  onTouchStart(event: TouchEvent) {
    if (event.touches.length !== 1) return;
    if (event.target !== this.renderer.domElement) return;

    event.preventDefault();

    const touch = event.touches[0];
    this.isTouchActive = true;
    this.mouseStart.set(touch.clientX, touch.clientY);
    this.mouseCurrent.copy(this.mouseStart);

    this.rotationVelocity.set(0, 0);
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isTouchActive || event.touches.length !== 1) return;

    event.preventDefault();

    const touch = event.touches[0];
    const previousMouse = this.mouseCurrent.clone();
    this.mouseCurrent.set(touch.clientX, touch.clientY);

    this.mouseDelta.subVectors(this.mouseCurrent, previousMouse);

    const deltaTheta = -this.mouseDelta.x * this.sensitivity;
    const deltaPhi = -this.mouseDelta.y * this.sensitivity;

    this.sphericalDelta.theta += deltaTheta;
    this.sphericalDelta.phi += deltaPhi;

    this.rotationVelocity.set(deltaTheta * this.dragVelocity, deltaPhi * this.dragVelocity);

    this.updateCamera();
  }

  onTouchEnd(_event: TouchEvent) {
    this.isTouchActive = false;

    const totalDrag = new Vector2().subVectors(this.mouseCurrent, this.mouseStart);
    const dragMagnitude = totalDrag.length();

    if (dragMagnitude > 5) {
      this.rotationVelocity.multiplyScalar(1.5);

      const rotationDirection = this.rotationVelocity.clone().normalize();
      this.baseRotationSpeed.x = rotationDirection.x * 0.001;
      this.baseRotationSpeed.y = rotationDirection.y * 0.001;
    }
  }
}

export default Engine;
