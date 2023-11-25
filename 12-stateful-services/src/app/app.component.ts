import { Component, inject } from "@angular/core";
import { TaskListPageComponent } from "./task/task-list.page.component";
import { ProjectListPageComponent } from "./project/project-list.page.component";
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    TaskListPageComponent,
    ProjectListPageComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  styles: [
    `
      main,
      nav {
        @apply px-12;
      }
    `,
  ],
  template: `
    <h1 class="text-orange-500 uppercase py-4 text-2xl text-center">
      Another boring todolist
    </h1>
    <nav class="bg-orange-300">
      <ul class="flex gap-6">
        <li><a routerLink="/tasks" routerLinkActive="font-bold">Tasks</a></li>
        <li><a routerLink="/projects" routerLinkActive="font-bold">Projects</a></li>
      </ul>
    </nav>
    <main class="grid pt-4">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  private router = inject(Router);

  constructor() {
    this.router.navigateByUrl;
  }
}
