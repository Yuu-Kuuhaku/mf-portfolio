import { AfterViewInit, Component, computed, HostListener, signal } from '@angular/core';
import { ThreeScene } from "../three-scene/three-scene";
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-tecnologias',
  imports: [ThreeScene],
  templateUrl: './tecnologias.html',
  styleUrl: './tecnologias.scss',
})
export class Tecnologias implements AfterViewInit {

   screenWidth = signal(window.innerWidth);

  // breakpoints semânticos
  isDesktop = computed(() => this.screenWidth() >= 1024);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }
  color = 0x896DEB;
  colorLighten = 0xA7A6BA;
  backgroundColor = 0x0f172a;
  reflectionMaterialColor = 0xffffff;

  techs = [
    { name: 'HTML', icon_src: 'images/html-5.png' },
    { name: 'CSS', icon_src: 'images/css-3.png' },
    { name: 'JavaScript', icon_src: 'images/js.png' },
    { name: 'Angular', icon_src: 'svgs/angular.svg' },
    { name: 'TypeScript', icon_src: 'images/typescript.webp' },
    { name: 'Node.js', icon_src: 'images/nodejs.png' },
    { name: 'React', icon_src: 'svgs/react-logo.svg' },
    { name: 'Git', icon_src: 'svgs/git-svgrepo-com.svg' },

  ];


  techs2 = [
    { name: 'Docker', icon_src: 'svgs/docker-svgrepo-com.svg' },
    { name: 'MongoDB', icon_src: 'svgs/mongo-svgrepo-com.svg' },
    { name: 'PostgreSQL', icon_src: 'svgs/postgresql-svgrepo-com.svg' },
    { name: 'NestJS', icon_src: 'svgs/nestjs-svgrepo-com.svg' },
    { name: 'Flutter', icon_src: 'svgs/flutter-svgrepo-com.svg' },
    { name: 'Sass', icon_src: 'svgs/sass-svgrepo-com.svg' },
    { name: 'FlutterFlow', icon_src: 'images/flutterflow.jpg' },
    { name: 'Fluig', icon_src: 'images/fluig.jpg' },
  ];

  techsUsed = [
    { name: 'Angular', icon_src: 'svgs/angular.svg' },
    { name: 'TypeScript', icon_src: 'images/typescript.webp' },
    { name: 'Three.js', icon_src: 'images/threejs.png' },
  ];


  ngAfterViewInit(): void {
    const ctx = document.getElementById('techChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Html css Js', 'Angular', 'Node', 'React', 'Flutter', 'Fluig', 'TypeScript', 'Git', 'NestJS', 'Bancos de dados' ],
        datasets: [{
          label: 'Nível de domínio',
          data: [85, 90, 50, 60, 40, 60, 70, 90, 50, 50],
          backgroundColor: '#38bdf8',
          borderRadius: 5,
          barPercentage: 1,
          categoryPercentage: 0.5
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}
