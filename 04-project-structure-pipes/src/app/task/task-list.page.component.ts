import { Component, inject } from "@angular/core";
import { TasksListComponent } from "./ui/tasks-list.component";
import { Task } from "./model/Task";
import { NgIf } from "@angular/common";
import { TasksService } from "./data-access/tasks.service";
import { ComponentListState } from "../utils/list-state.type";
import { SubmitTextComponent } from "@ui/submit-text.component";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [TasksListComponent, SubmitTextComponent, NgIf],
  template: `
    <app-submit-text
      (submitText)="listState.state === 'success' && addTask($event, listState.results)"
    />
    <app-tasks-list
      *ngIf="listState.state === 'success'"
      class="block mt-4"
      [tasks]="listState.results"
    />
    <p *ngIf="listState.state === 'error'">{{ listState.error.message }}</p>
    <p *ngIf="listState.state === 'loading'">Loading...</p>
  `,
})
export class TaskListPageComponent {
  listState: ComponentListState<Task> = { state: "idle" };

  private tasksService = inject(TasksService);

  ngOnInit() {
    this.listState = { state: "loading" };
    this.tasksService.getAll().then((response) => {
      if (Array.isArray(response)) {
        this.listState = {
          state: "success",
          results: response,
        };
      } else {
        this.listState = {
          state: "error",
          error: response,
        };
      }
    });
  }

  addTask(name: string, tasks: Task[]) {
    this.tasksService.add(name).then((response) => {
      if ("id" in response) {
        this.listState = {
          state: "success",
          results: tasks.concat(response),
        };
      } else {
        alert(response.message);
      }
    });
  }
}
