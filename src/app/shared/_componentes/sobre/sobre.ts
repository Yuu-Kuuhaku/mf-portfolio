import { Component, computed, HostListener, signal } from '@angular/core';
import { ThreeScene } from "../three-scene/three-scene";

@Component({
  selector: 'app-sobre',
  imports: [ThreeScene],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss',
})
export class Sobre {

  screenWidth = signal(window.innerWidth);

  // breakpoints semânticos
  isDesktop = computed(() => this.screenWidth() >= 1024);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }
  color = 0x111111;
  colorLighten = 0x4a4a4a;
  backgroundColor = 0xfafafa;
  reflectionMaterialColor = 0x111111;
}
