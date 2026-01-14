import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-img-carousel',
  imports: [CommonModule],
  templateUrl: './img-carousel.html',
  styleUrl: './img-carousel.scss',
})
export class ImgCarousel implements OnDestroy {
 @Input({ required: true }) images: string[] = [];

 currentIndex = signal(0);
  prevIndex = signal<number | null>(null);

  intervalId!: number;

  constructor() {
    this.intervalId = window.setInterval(() => {
      this.next();
    }, 3000);
  }

  next() {
    if (!this.images.length) return;

    this.prevIndex.set(this.currentIndex());
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
