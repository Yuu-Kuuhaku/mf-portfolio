import { Routes } from '@angular/router';
import { LoadingScreen } from './pages/loading-screen/loading-screen';
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
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFound
  },
  {
    path: '',
    component: LoadingScreen
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
