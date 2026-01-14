import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-curriculo',
  imports: [RouterLink],
  templateUrl: './curriculo.html',
  styleUrl: './curriculo.scss',
})
export class Curriculo implements OnInit {

  ngOnInit(): void {
    this.scrollTo('curriculo-top');
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
