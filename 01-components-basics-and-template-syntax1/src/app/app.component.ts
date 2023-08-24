import { Component } from "@angular/core";
import { TasksListComponent } from "./tasks-list.component";
import { SubmitTextComponent } from "./submit-text.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TasksListComponent, SubmitTextComponent],

  template: `
    <h1 class="text-orange-500 bg-black py-4 text-xl text-center mb-4">
      Another boring todolist
    </h1>
    <app-submit-text (submitText)="addTask($event)" />
    <app-tasks-list [tasks]="tasks" />
  `,
})
export class AppComponent {
  tasks = [
    {
      name: "Angular introduction",
      done: false,
    },
    {
      name: "Learn components",
      done: true,
    },
  ];

  addTask(name: string) {
    this.tasks.push({
      name,
      done: false,
    });
  }
}
