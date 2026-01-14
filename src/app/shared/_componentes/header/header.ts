import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',

})
export class Header {

  isVisible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    const triggerPoint = window.innerHeight;

    this.isVisible.update(() => window.scrollY >= triggerPoint);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
