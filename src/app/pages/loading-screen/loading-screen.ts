import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-loading-screen',
  imports: [CommonModule, RouterLink],
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
})
export class LoadingScreen {

 loading = signal(true);

  constructor() {
    setTimeout(() => {
      this.loading.set(false);
    }, 2000); // 2 segundos
  }
}
