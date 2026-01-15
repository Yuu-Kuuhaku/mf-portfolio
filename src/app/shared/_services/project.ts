import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
 private http = inject(HttpClient);
  private readonly url = 'data/projects.json';

  projects = signal<Project[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  loadProjects() {
    this.loading.set(true);

    this.http.get<Project[]>(this.url).subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar projetos');
        this.loading.set(false);
      },
    });
  }
}
