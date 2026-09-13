import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'models', 'vehicles');

// Node.js FileReader polyfill
global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

console.log('🚗 Compiling Manufactured Modern EV Sedan 3D Model...');

const scene = new THREE.Scene();
scene.name = 'Car_Sedan_Root';

// Materials
const matCarPaintWhite = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.18,
  metalness: 0.82,
  name: 'M_Paint_PearlWhite',
});

const matCarbonTrim = new THREE.MeshStandardMaterial({
  color: 0x111215,
  roughness: 0.45,
  metalness: 0.7,
  name: 'M_Carbon_Trim',
});

const matTireRubber = new THREE.MeshStandardMaterial({
  color: 0x18181b,
  roughness: 0.85,
  metalness: 0.05,
  name: 'M_Tire_Rubber',
});

const matAlloyRim = new THREE.MeshStandardMaterial({
  color: 0xd1d5db,
  roughness: 0.2,
  metalness: 0.95,
  name: 'M_Wheel_Alloy',
});

const matBrakeCaliper = new THREE.MeshStandardMaterial({
  color: 0xb7ff00,
  roughness: 0.3,
  metalness: 0.8,
  name: 'M_Brake_Caliper',
});

const matGlassTinted = new THREE.MeshStandardMaterial({
  color: 0x0f172a,
  roughness: 0.08,
  metalness: 0.85,
  transparent: true,
  opacity: 0.65,
  name: 'M_Glass_Tinted',
});

const matLedHeadlight = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xe0f2fe,
  emissiveIntensity: 1.2,
  roughness: 0.1,
  name: 'M_Light_Headlight',
});

const matLedTaillight = new THREE.MeshStandardMaterial({
  color: 0xff1e1e,
  emissive: 0xef4444,
  emissiveIntensity: 1.2,
  roughness: 0.1,
  name: 'M_Light_Taillight',
});

// Helper for curved car panels
function createBeveledMesh(w, h, d, r = 0.04) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  const radius = Math.min(r, w / 2, h / 2);

  shape.moveTo(x + radius, y);
  shape.lineTo(x + w - radius, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + radius);
  shape.lineTo(x + w, y + h - radius);
  shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  shape.lineTo(x + radius, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geom = new THREE.ExtrudeGeometry(shape, {
    steps: 1,
    depth: d - radius * 2,
    bevelEnabled: true,
    bevelThickness: radius,
    bevelSize: radius,
    bevelSegments: 3,
  });
  geom.center();
  return geom;
}

const carGroup = new THREE.Group();
carGroup.name = 'Car_Sedan_Body';

// 1. Lower Aerodynamic Diffuser & Undercarriage Skirt
const skirtGeom = createBeveledMesh(1.92, 0.18, 4.45, 0.03);
const skirt = new THREE.Mesh(skirtGeom, matCarbonTrim);
skirt.position.set(0, 0.18, 0);
skirt.castShadow = true;
carGroup.add(skirt);

// 2. Sculpted Lower Body Hull
const hullGeom = createBeveledMesh(1.94, 0.42, 4.3, 0.06);
const hull = new THREE.Mesh(hullGeom, matCarPaintWhite);
hull.position.set(0, 0.46, 0);
hull.castShadow = true;
hull.receiveShadow = true;
carGroup.add(hull);

// 3. Sloped Aerodynamic Front Hood
const hoodGeom = createBeveledMesh(1.88, 0.28, 1.25, 0.05);
const hood = new THREE.Mesh(hoodGeom, matCarPaintWhite);
hood.position.set(0, 0.52, -1.55);
hood.rotation.x = -0.1;
hood.castShadow = true;
carGroup.add(hood);

// 4. Sloped Rear Deck Trunk
const trunkGeom = createBeveledMesh(1.86, 0.24, 0.95, 0.04);
const trunk = new THREE.Mesh(trunkGeom, matCarPaintWhite);
trunk.position.set(0, 0.54, 1.68);
trunk.rotation.x = 0.08;
trunk.castShadow = true;
carGroup.add(trunk);

// 5. Greenhouse Canopy & Panoramic Glass
const cabinGeom = createBeveledMesh(1.68, 0.52, 2.3, 0.08);
const cabin = new THREE.Mesh(cabinGeom, matGlassTinted);
cabin.position.set(0, 0.88, -0.05);
cabin.castShadow = true;
carGroup.add(cabin);

// Roof panel slab
const roofGeom = createBeveledMesh(1.58, 0.06, 1.85, 0.03);
const roof = new THREE.Mesh(roofGeom, matCarPaintWhite);
roof.position.set(0, 1.15, -0.05);
carGroup.add(roof);

// 6. Side Wing Mirrors
[-0.98, 0.98].forEach((mx) => {
  const mirrorGeom = createBeveledMesh(0.18, 0.09, 0.12, 0.02);
  const mirror = new THREE.Mesh(mirrorGeom, matCarPaintWhite);
  mirror.position.set(mx, 0.82, -0.8);
  mirror.rotation.y = mx > 0 ? 0.2 : -0.2;
  carGroup.add(mirror);
});

// 7. Full-Width LED Headlight Blade
const headBladeGeom = new THREE.BoxGeometry(1.82, 0.05, 0.06);
const headBlade = new THREE.Mesh(headBladeGeom, matLedHeadlight);
headBlade.position.set(0, 0.48, -2.18);
carGroup.add(headBlade);

// 8. Full-Width LED Taillight Blade
const tailBladeGeom = new THREE.BoxGeometry(1.82, 0.05, 0.06);
const tailBlade = new THREE.Mesh(tailBladeGeom, matLedTaillight);
tailBlade.position.set(0, 0.58, 2.16);
carGroup.add(tailBlade);

// 9. Four Wheels with Disc Brakes and Alloy Rims
const wheelPositions = [
  [-0.94, 0.32, -1.35],
  [0.94, 0.32, -1.35],
  [-0.94, 0.32, 1.35],
  [0.94, 0.32, 1.35],
];

wheelPositions.forEach(([wx, wy, wz], wIdx) => {
  const wheelGroup = new THREE.Group();
  wheelGroup.position.set(wx, wy, wz);

  // Rubber Tire
  const tireGeom = new THREE.CylinderGeometry(0.33, 0.33, 0.22, 24);
  tireGeom.rotateZ(Math.PI / 2);
  const tire = new THREE.Mesh(tireGeom, matTireRubber);
  tire.castShadow = true;
  wheelGroup.add(tire);

  // Alloy Wheel Rim
  const rimGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.225, 20);
  rimGeom.rotateZ(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeom, matAlloyRim);
  wheelGroup.add(rim);

  // Brake Caliper
  const caliperGeom = new THREE.BoxGeometry(0.08, 0.12, 0.08);
  const caliper = new THREE.Mesh(caliperGeom, matBrakeCaliper);
  caliper.position.set(wx > 0 ? -0.05 : 0.05, 0.12, 0);
  wheelGroup.add(caliper);

  carGroup.add(wheelGroup);
});

scene.add(carGroup);

// Export GLB
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'car_sedan.glb');
const exporter = new GLTFExporter();
exporter.parse(
  scene,
  async (glb) => {
    const buffer = Buffer.from(glb instanceof ArrayBuffer ? glb : await glb.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    const sizeKb = (buffer.byteLength / 1024).toFixed(1);
    console.log(`✅ SUCCESS! Exported Manufactured EV Sedan GLB to:`);
    console.log(`   ${outputPath} (${sizeKb} KB)`);
    process.exit(0);
  },
  (err) => {
    console.error('❌ Failed to export GLB:', err);
    process.exit(1);
  },
  { binary: true }
);
