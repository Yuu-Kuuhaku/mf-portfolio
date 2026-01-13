import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectsSectionComponent } from '../../shared/_componentes/projects-section/projects-section';

@Component({
  selector: 'app-portfolio',
  imports: [ProjectsSectionComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements AfterViewInit {

   @ViewChild('bgVideo')
  videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoRef?.nativeElement;

    if (!video) return;

    video.muted = true;

    video.play().catch(() => {
      console.warn('Autoplay foi bloqueado; clique para iniciar');
    });
  }

}
