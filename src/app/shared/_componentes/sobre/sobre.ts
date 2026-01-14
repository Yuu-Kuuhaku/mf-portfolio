import { Component } from '@angular/core';
import { ThreeScene } from "../three-scene/three-scene";

@Component({
  selector: 'app-sobre',
  imports: [ThreeScene],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss',
})
export class Sobre {
  color = 0x111111;
  colorLighten = 0x4a4a4a;
  backgroundColor = 0xfafafa;
  reflectionMaterialColor = 0x111111;
}
