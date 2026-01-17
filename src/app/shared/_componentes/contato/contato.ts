import { Component, computed, HostListener, signal } from '@angular/core';
import { ThreeScene } from '../three-scene/three-scene';

@Component({
  selector: 'app-contato',
  imports: [ThreeScene],
  templateUrl: './contato.html',
  styleUrl: './contato.scss',
})
export class Contato {
  screenWidth = signal(window.innerWidth);

  // breakpoints semânticos
  isDesktop = computed(() => this.screenWidth() >= 1024);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }
  color = 0x19607e;
  colorLighten = 0x94a3b8;
  backgroundColor = 0x020617;
  reflectionMaterialColor = 0x19607e;
  contatos = [
    {
      icon: 'fa-brands fa-whatsapp',
      label: 'WhatsApp',
      value: '+55 37 98816-9656',
      link: 'https://wa.me/5537988169656',
    },
    {
      icon: 'fa-solid fa-envelope',
      label: 'E-mail',
      value: 'eustaquiofadeveloper@gmail.com',
      link: 'mailto:eustaquiofadeveloper@gmail.com',
    },
    {
      icon: 'fa-brands fa-github',
      label: 'GitHub',
      value: 'github.com/Yuu-Kuuhaku',
      link: 'https://github.com/Yuu-Kuuhaku',
    },
    {
      icon: 'fa-brands fa-linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/eust%C3%A1quio-ferreira-27539619b/',
      link: 'https://www.linkedin.com/in/eust%C3%A1quio-ferreira-27539619b/',
    },
  ];
}
