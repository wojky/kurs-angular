import { Component, Input, inject } from "@angular/core";
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
  @Input() projectId?: string;

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

    const source$ = this.projectId
      ? this.tasksService.getAllByProjectId(this.projectId, searchParams)
      : this.tasksService.getAll(searchParams);

    source$.subscribe({
      next: (response) => {
        console.log(response.headers.get("Content-Length"));

        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: response.body!,
        };
      },
      error: (err) => {
        this.listState = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }

  addTask(name: string, tasks: Task[]): void {
    this.tasksService.add(name).subscribe({
      next: (task) => {
        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: tasks.concat(task),
        };
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
