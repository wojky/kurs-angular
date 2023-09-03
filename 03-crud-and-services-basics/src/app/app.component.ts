import { Component } from "@angular/core";
import { TaskListPageComponent } from "./task-list.page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TaskListPageComponent],

  template: `
    <h1 class="text-orange-500 uppercase py-4 text-2xl text-center">
      Another boring todolist
    </h1>
    <main class="grid place-items-center pt-4">
      <app-task-list-page />
    </main>
  `,
})
export class AppComponent {}
