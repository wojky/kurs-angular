import { Component, Input } from "@angular/core";
import { TasksListComponent } from "./tasks-list.component";
import { Task } from "../model/Task";

@Component({
  standalone: true,
  selector: "app-tasks-kanban-view",
  imports: [TasksListComponent],
  template: `
    <section class="flex gap-4">
      <div class="w-1/2">
        <p class="font-semibold text-xl">Todo</p>
        <app-tasks-list class="block mt-4" [tasks]="todos" />
      </div>
      <div class="w-1/2">
        <p class="font-semibold text-xl">Done</p>
        <app-tasks-list class="block mt-4" [tasks]="tasksDone" />
      </div>
    </section>
  `,
})
export class TasksKanbanViewComponent {
  @Input({ required: true }) set tasks(value: Task[]) {
    this.todos = value.filter((task) => !task.done);
    this.tasksDone = value.filter((task) => task.done);
  }

  todos: Task[] = [];
  tasksDone: Task[] = [];
}
