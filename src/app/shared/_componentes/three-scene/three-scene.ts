import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import type { Font } from 'three/addons/loaders/FontLoader.js';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.html',
  styleUrls: ['./three-scene.scss']
})
export class ThreeScene
  implements AfterViewInit, OnDestroy {

  @Input() text = 'texto';
  @Input() size = 70;
  @Input() backgroundColor = 0xffffff;
  @Input() color = 0xffffff;
  @Input() colorLighten = 0x2a2a2a;
  @Input() reflectionMaterialColor = 0xffffff;

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private camera!: THREE.PerspectiveCamera;
  private cameraTarget = new THREE.Vector3(0, 150, 0);
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;

  private group!: THREE.Group;
  private textMesh1!: THREE.Mesh;
  private textMesh2!: THREE.Mesh;


  private font!: Font;

  private targetRotation = 0;
  private targetRotationOnPointerDown = 0;
  private pointerX = 0;
  private pointerXOnPointerDown = 0;
  private windowHalfX = window.innerWidth / 2;

  private animationId!: number;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
  }

  private initScene(): void {
    const { clientWidth, clientHeight } = this.container.nativeElement;

    // Camera
    this.camera = new THREE.PerspectiveCamera(30, clientWidth / clientHeight, 1, 1500);
    this.camera.position.set(0, 400, 700);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.backgroundColor);
    this.scene.fog = new THREE.Fog(0xffffff, 1000, 1500);

    // Luz principal (frontal suave)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(0, 300, 300);
    this.scene.add(keyLight);

    // Luz de preenchimento (remove sombras duras)
    const fillLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(fillLight);

    // Luz de recorte (dá destaque nas bordas)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(-200, 200, -200);
    this.scene.add(rimLight);

    // Group
    this.group = new THREE.Group();
    this.group.position.y = 100;
    this.scene.add(this.group);

    // Load font
    const loader = new FontLoader();
    loader.load('fonts/optimer_bold.typeface.json', (font: any) => {
      this.font = font;
      this.createText();
    });

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(clientWidth, clientHeight);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    // Events
    this.container.nativeElement.addEventListener('pointerdown', this.onPointerDown);
    document.addEventListener('keydown', this.onKeyDown);
  }

  private animate = () => {
    // rotação infinita suave
    this.group.rotation.y += 0.009;

    // quando chegar a 180 graus (PI), reseta
    if (this.group.rotation.y >= (Math.PI /2)) {
      this.group.rotation.y = - Math.PI /2;
    }

    this.camera.lookAt(this.cameraTarget);
    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  private createText(): void {
    this.group.clear();

    const geometry = new TextGeometry(this.text, {
      font: this.font,
      size: this.size,
      depth: 20,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1.5
    });

    geometry.computeBoundingBox();

    const centerOffset =
      -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);

    const materials = [
      new THREE.MeshPhongMaterial({
        color: this.color, // quase preto
        flatShading: true
      }),
      new THREE.MeshPhongMaterial({
        color: this.colorLighten,
      })
    ];

   // Texto principal
    this.textMesh1 = new THREE.Mesh(geometry, materials);
    this.textMesh1.position.set(centerOffset, 30, 0);
    this.group.add(this.textMesh1);

    // ===== TEXTO REFLEXO =====
    const reflectionMaterial = new THREE.MeshPhongMaterial({
      color: this.reflectionMaterialColor,
      opacity: 0.25,          // transparência
      transparent: true,
      shininess: 10
    });

    reflectionMaterial.opacity = 0.18;


    this.textMesh2 = new THREE.Mesh(geometry, reflectionMaterial);

    // posição abaixo
    this.textMesh2.position.set(centerOffset, -30, 20);

    // espelha verticalmente
    this.textMesh2.scale.y = -1;

    // leve inclinação (angulação)
    this.textMesh2.rotation.x = Math.PI * 0.3;

    // leve desfoque visual (simulado pela luz)
    this.textMesh2.renderOrder = 0;
    this.textMesh2.position.y = -40;

    this.group.add(this.textMesh2);
  }

  private onResize = () => {
    const { clientWidth, clientHeight } = this.container.nativeElement;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);
    this.windowHalfX = clientWidth / 2;
  };

  private onPointerDown = (event: PointerEvent) => {
    this.pointerXOnPointerDown = event.clientX - this.windowHalfX;
    this.targetRotationOnPointerDown = this.targetRotation;

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  };

  private onPointerMove = (event: PointerEvent) => {
    this.pointerX = event.clientX - this.windowHalfX;
    this.targetRotation =
      this.targetRotationOnPointerDown +
      (this.pointerX - this.pointerXOnPointerDown) * 0.02;
  };

  private onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      this.text = this.text.slice(0, -1);
    } else if (event.key.length === 1) {
      this.text += event.key;
    }
    this.createText();
  };
}
