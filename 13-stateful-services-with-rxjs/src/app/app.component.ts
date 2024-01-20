import { Component } from "@angular/core";
import { TaskListPageComponent } from "./task/task-list.page.component";
import { ProjectListPageComponent } from "./project/project-list.page.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

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
    <nav class="bg-orange-300 py-4">
      <ul class="flex gap-6">
        <li>
          <a
            routerLink="/tasks"
            routerLinkActive="font-bold"
            [routerLinkActiveOptions]="{ exact: true }"
            >Tasks</a
          >
        </li>
        <li><a routerLink="/projects" routerLinkActive="font-bold">Projects (0)</a></li>
        <li class="ml-auto">
          <a routerLink="/tasks/urgent" routerLinkActive="font-bold">Urgent (0)</a>
        </li>
      </ul>
    </nav>
    <main class="grid pt-4">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}
