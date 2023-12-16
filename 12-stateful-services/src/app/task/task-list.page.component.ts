import { Component, Input, inject } from "@angular/core";
import { TasksListComponent } from "./ui/tasks-list.component";
import { Task } from "./model/Task";
import { GetAllTasksSearchParams, TasksService } from "./data-access/tasks.service";
import { ComponentListState, LIST_STATE_VALUE } from "../utils/list-state.type";
import { SubmitTextComponent } from "@ui/submit-text.component";
import {
  TasksListFiltersComponent,
  TasksListFiltersFormValue,
} from "./ui/task-list-filters.component";
import { getAllTasksSearchParams } from "./data-access/tasks-filters.adapter";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherColumns, featherList } from "@ng-icons/feather-icons";
import { TasksKanbanViewComponent } from "./ui/tasks-kanban.component";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [
    TasksListComponent,
    SubmitTextComponent,
    TasksListFiltersComponent,
    NgIconComponent,
    TasksKanbanViewComponent,
  ],
  template: `
    <app-submit-text
      (submitText)="
        listState.state === listStateValue.SUCCESS && addTask($event, listState.results)
      "
    />
    <app-tasks-list-filters (filtersChange)="handleFiltersChange($event)" />

    <div class="flex gap-4 items-center my-4">
      <span> View mode:</span>
      <button
        (click)="view = 'list'"
        class="flex"
        [class.text-green-500]="view === 'list'"
      >
        <ng-icon name="featherList" />
      </button>
      <button
        (click)="view = 'kanban'"
        class="flex"
        [class.text-green-500]="view === 'kanban'"
      >
        <ng-icon name="featherColumns" />
      </button>
    </div>

    @switch (listState.state) {
      @case (listStateValue.SUCCESS) {
        @if (view === "list") {
          <app-tasks-list class="block mt-4" [tasks]="listState.results" />
        } @else {
          <app-tasks-kanban-view [tasks]="listState.results" />
        }
      }
      @case (listStateValue.ERROR) {
        <p>
          {{ listState.error.message }}
        </p>
      }
      @case (listStateValue.LOADING) {
        <p>Loading...</p>
      }
    }
  `,
  viewProviders: [provideIcons({ featherList, featherColumns })],
})
export class TaskListPageComponent {
  @Input() projectId?: string;
  @Input() view?: "kanban" | "list";
  @Input() urgent?: boolean;

  private tasksService = inject(TasksService);

  listState: ComponentListState<Task> = { state: LIST_STATE_VALUE.IDLE };
  listStateValue = LIST_STATE_VALUE;

  ngOnInit() {
    this.view = this.view || "list";
    this.urgent = this.urgent || false;
  }

  handleFiltersChange(filters: TasksListFiltersFormValue): void {
    this.getAllTasks(getAllTasksSearchParams({ ...filters, urgent: this.urgent }));
  }

  getAllTasks(searchParams: GetAllTasksSearchParams): void {
    this.listState = { state: LIST_STATE_VALUE.LOADING };

    const source$ = this.projectId
      ? this.tasksService.getAllByProjectId(this.projectId, searchParams)
      : this.tasksService.getAll(searchParams);

    source$.subscribe({
      next: (response) => {
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
