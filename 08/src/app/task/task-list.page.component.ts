import { Component, inject } from "@angular/core";
import { TasksListComponent } from "./ui/tasks-list.component";
import { Task } from "./model/Task";
import { NgIf } from "@angular/common";
import { GetAllTasksSearchParams, TasksService } from "./data-access/tasks.service";
import { ComponentListState, LIST_STATE_VALUE } from "../utils/list-state.type";
import { SubmitTextComponent } from "@ui/submit-text.component";
import {
  TasksListFiltersComponent,
  TasksListFiltersFormValue,
} from "./ui/task-list-filters.component";
import { getAllTasksSearchParams } from "./data-access/tasks-filters.adapter";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [TasksListComponent, SubmitTextComponent, NgIf, TasksListFiltersComponent],
  template: `
    <app-submit-text
      (submitText)="
        listState.state === listStateValue.SUCCESS && addTask($event, listState.results)
      "
    />
    <app-tasks-list-filters (filtersChange)="handleFiltersChange($event)" />
    <app-tasks-list
      *ngIf="listState.state === listStateValue.SUCCESS"
      class="block mt-4"
      [tasks]="listState.results"
    />
    <p *ngIf="listState.state === listStateValue.ERROR">
      {{ listState.error.message }}
    </p>
    <p *ngIf="listState.state === listStateValue.LOADING">Loading...</p>
  `,
})
export class TaskListPageComponent {
  private tasksService = inject(TasksService);

  listState: ComponentListState<Task> = { state: LIST_STATE_VALUE.IDLE };
  listStateValue = LIST_STATE_VALUE;

  ngOnInit() {
    // this.getAllTasks(getAllTasksSearchParams(this.form.getRawValue()));
  }

  handleFiltersChange(filters: TasksListFiltersFormValue): void {
    this.getAllTasks(getAllTasksSearchParams(filters));
  }

  getAllTasks(searchParams: GetAllTasksSearchParams): void {
    this.listState = { state: LIST_STATE_VALUE.LOADING };

    this.tasksService.getAll(searchParams).then((response) => {
      if (Array.isArray(response)) {
        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: response,
        };
      } else {
        this.listState = {
          state: LIST_STATE_VALUE.ERROR,
          error: response,
        };
      }
    });
  }

  addTask(name: string, tasks: Task[]): void {
    this.tasksService.add(name).then((response) => {
      if ("id" in response) {
        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: tasks.concat(response),
        };
      } else {
        alert(response.message);
      }
    });
  }
}
