import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { Main } from './main/main';

export const routes: Routes = [
  {
    path: 'main',
    component: Main,
    children: [
      {
        path: 'portfolio',
        loadComponent() {
          return import('./pages/portfolio/portfolio').then(m => m.Portfolio);
        }
      },
      {
        path: 'curriculo',
        loadComponent() {
          return import('./pages/curriculo/curriculo').then(m => m.Curriculo);
        }
      },
      {
        path: 'lizard',
        loadComponent() {
          return import('./pages/lizard/lizard').then(m => m.Lizard);
        }
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFound,

  },
  {
    path: '',
    redirectTo: 'main/portfolio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
