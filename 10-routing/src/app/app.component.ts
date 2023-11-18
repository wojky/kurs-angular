import { Component } from "@angular/core";
import { TaskListPageComponent } from "./task/task-list.page.component";
import { ProjectListPageComponent } from "./project/project-list.page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TaskListPageComponent, ProjectListPageComponent],
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
    <!-- <nav class="bg-orange-300">
      <ul class="flex gap-6">
        <li><a>Tasks</a></li>
        <li><a>Projects</a></li>
      </ul>
    </nav> -->
    <main class="grid pt-4">
      <app-project-list-page />
      <hr class="my-6" />
      <app-task-list-page />
    </main>
  `,
})
export class AppComponent {}
