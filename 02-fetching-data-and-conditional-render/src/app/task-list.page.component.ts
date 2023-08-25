import { Component } from "@angular/core";
import { TasksListComponent } from "./tasks-list.component";
import { SubmitTextComponent } from "./submit-text.component";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [TasksListComponent, SubmitTextComponent],
  template: `
    <app-submit-text (submitText)="addTask($event)" />
    <app-tasks-list class="block mt-4" [tasks]="tasks" />
  `,
})
export class TaskListPageComponent {
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
