import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgCarousel } from '../img-carousel/img-carousel';
import { ThreeScene } from "../three-scene/three-scene";
import { ProjectsService } from '../../_services/project';
import { RouterLink } from "@angular/router";

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
  imports: [CommonModule, ImgCarousel, ThreeScene, RouterLink],
  templateUrl: './projects-section.html',
  styleUrls: ['./projects-section.scss']
})
export class ProjectsSectionComponent {

  projectsService = inject(ProjectsService);

  ngOnInit() {
    this.projectsService.loadProjects();
  }

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


}
