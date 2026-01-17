import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ProjectsSectionComponent } from '../../shared/_componentes/projects-section/projects-section';
import { Header } from "../../shared/_componentes/header/header";
import { Sobre } from "../../shared/_componentes/sobre/sobre";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tecnologias } from "../../shared/_componentes/tecnologias/tecnologias";
import { Contato } from "../../shared/_componentes/contato/contato";
import { Footer } from "../../shared/_componentes/footer/footer";

@Component({
  selector: 'app-portfolio',
  imports: [ProjectsSectionComponent, Header, Sobre, Tecnologias, Contato, Footer, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements AfterViewInit, OnInit {

  private readonly route = inject(ActivatedRoute);

  loading = signal(true);
  isVisible = signal<boolean>(false);

  constructor() {
    setTimeout(() => {
      this.loading.set(false);
    }, 2000); // 2 segundos
  }

  show() {
    this.isVisible.set(true);
  }

  @ViewChild('bgVideo')
  videoRef!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const secao = params['secao'];
      if (secao) {
        this.scrollTo(secao);
      }
    });
  }

  ngAfterViewInit(): void {
    const video = this.videoRef?.nativeElement;

    if (!video) return;

    video.muted = true;

    video.play().catch(() => {
      console.warn('Autoplay foi bloqueado; clique para iniciar');
    });
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

}
