import {
  Directive,
  ElementRef,
  Input,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective {
  @Input() offset = 200; // px antes do elemento aparecer
  private hasAnimated = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.hasAnimated) return;

    const elementTop =
      this.el.nativeElement.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    console.log(elementTop < viewportHeight - this.offset)
    console.log(this.el.nativeElement)
    if (elementTop < viewportHeight - this.offset) {
      this.el.nativeElement.classList.add('active');
      // this.hasAnimated = true;
    }
  }
}
