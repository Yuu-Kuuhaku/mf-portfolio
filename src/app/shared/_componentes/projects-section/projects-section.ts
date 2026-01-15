import { Component, computed, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgCarousel } from '../img-carousel/img-carousel';
import { ThreeScene } from "../three-scene/three-scene";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  images: string[];
  stacks?: string[];
  link?: string;
  github_link?: string;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, ImgCarousel, ThreeScene],
  templateUrl: './projects-section.html',
  styleUrls: ['./projects-section.scss']
})
export class ProjectsSectionComponent {


  screenWidth = signal(window.innerWidth);

  // breakpoints semânticos
  isDesktop = computed(() => this.screenWidth() >= 1024);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  color = 0xffffff;
  colorLighten = 0xcacaca;
  backgroundColor = 0x050505;
  reflectionMaterialColor = 0xcacaca;

  projects = signal<Project[]>([
    {
      title: 'Your Therapy',
      subtitle: 'Bem star Mental',
      description: 'Um espaço digital de acolhimento para cuidar da mente, registrar emoções e encontrar momentos de calma no dia a dia.',
      gradient: 'linear-gradient(135deg, #a6c46e, #3d6b2d)',
      images: [
        'images/yourtherapy/img1.jpg',
        'images/yourtherapy/img2.jpg',
        'images/yourtherapy/img3.jpg',
        'images/yourtherapy/img4.jpg',
        'images/yourtherapy/img5.jpg',
        'images/yourtherapy/img6.jpg'
      ],
      stacks: ['Android studio', 'Java', 'SQLite'],
      github_link: 'https://github.com/Yuu-Kuuhaku/your_therapy'
    },
    {
      title: 'Gerador de fichas para RPG (malditos goblins)',
      subtitle: 'Jogos RPG',
      description: 'Aplicação web desenvolvida para gerar fichas de personagens do sistema Malditos Goblins, com foco em automação, usabilidade e experiência do usuário.',
      gradient: 'linear-gradient(135deg, #d97d9a, #52944f)',
      images: [
        'images/malditos-goblins/img1.png',
        'images/malditos-goblins/img2.png',
      ],
      stacks: ['Angular', 'TypeScript', 'SCSS'],
      link: 'https://malditos-goblins-rpg.s3.sa-east-1.amazonaws.com/index.html',
      github_link: 'https://github.com/Yuu-Kuuhaku/malditos-goblins'
    },
    {
      title: 'estruturapp (easyapp)',
      subtitle: 'Software de premiação/Cashback',
      description: 'Plataforma que ajuda empresas a aumentar vendas por meio de premiação e cashback personalizados, fortalecendo a fidelização de clientes e parceiros locais.',
      gradient: 'linear-gradient(135deg,rgba(72, 23, 147, 1), rgba(217, 95, 225, 1), rgba(255, 186, 158, 1) 100%)',
      images: [
        'images/estruturapp/img1.png',
        'images/estruturapp/img2.png',
        'images/estruturapp/img3.jpeg',
        'images/estruturapp/img4.jpeg'
      ],
      stacks: ['Angular', 'TypeScript', 'SCSS', 'Angular Material', 'java', 'Mysql'],
      link: 'https://www.estruturapp.com.br/',
    },
    {
      title: 'eubebo/vendola',
      subtitle: 'Ecommerce/delivery de bebidas',
      description: 'Ecommerce especializado em bebidas, oferecendo uma ampla variedade de produtos com entrega rápida e eficiente para os clientes.',
      gradient: 'linear-gradient(135deg, #510c76, #e50947)',
      images: [
        'images/eubebo/img1.jpeg',
        'images/eubebo/img2.jpeg',
      ],
      stacks: ['Angular', 'TypeScript', 'SCSS', 'Angular Material', 'Mysql', 'nestjs', 'mongodb', 'docker', 'flutter']
    },
    {
      title: 'demae',
      subtitle: 'Gerenciamento de água e esgoto',
      description: 'Sistema de gerenciamento de água e esgoto para empresa de saneamento.',
      gradient: 'linear-gradient(135deg, #06b6d4, #2563eb)',
      images: [
        'images/demae/img1.png',
        'images/demae/img2.png',
      ],
      stacks: ['Angular', 'TypeScript', 'SCSS', 'Angular Material', 'Mysql', 'java', ]
    },
    {
      title: 'cerveja&tudo',
      subtitle: 'Ecommerce',
      description: 'Ecommerce especializado em bebidas, oferecendo uma ampla variedade de produtos com entrega rápida e eficiente para os clientes.',
      gradient: 'linear-gradient(135deg, #000, #fde101)',
      images: [
        'images/cerveja&tudo/img1.jpeg',
        'images/cerveja&tudo/img2.jpeg'
      ],
      stacks: ['Angular', 'TypeScript', 'SCSS', 'Angular Material', 'Mysql', 'nodejs', 'mongodb', 'docker', 'flutter']
    }
  ]);
}
