import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',

})
export class Header {

  screenWidth = signal(window.innerWidth);
  isVisible = signal(this.screenWidth() <= 1024);
  menuOpen = signal(false);

  isDesktop = computed(() => this.screenWidth() > 1024);

  @HostListener('window:scroll')
  onScroll() {
    const triggerPoint = window.innerHeight;

    if (this.screenWidth() < 1024) {
      this.isVisible.set(true);
      return;
    }

    this.isVisible.update(() => window.scrollY >= triggerPoint);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.isDesktop()) {
      this.menuOpen.set(false);
    }
  }

  toggleMenu() {
    console.log('toggleMenu called');
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

}
