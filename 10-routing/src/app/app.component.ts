import { Component } from "@angular/core";
import { TaskListPageComponent } from "./task/task-list.page.component";
import { ProjectListPageComponent } from "./project/project-list.page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TaskListPageComponent, ProjectListPageComponent],

  template: `
    <h1 class="text-orange-500 uppercase py-4 text-2xl text-center">
      Another boring todolist
    </h1>
    <main class="grid pt-4 px-12">
      <app-project-list-page />
      <hr class="my-6" />
      <app-task-list-page />
    </main>
  `,
})
export class AppComponent {}
