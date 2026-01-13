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
        path: 'home',
        loadComponent() {
          return import('./pages/home/home').then(m => m.Home);
        }
      },
      {
        path: 'about',
        loadComponent() {
          return import('./pages/about/about').then(m => m.About);
        }
      },
      {
        path: 'projects',
        loadComponent() {
          return import('./pages/projects/projects').then(m => m.Projects);
        }
      },
      {
        path: 'portfolio',
        loadComponent() {
          return import('./pages/portfolio/portfolio').then(m => m.Portfolio);
        }
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent() {
          return import('./pages/login/login').then(m => m.Login);
        }
      },
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
