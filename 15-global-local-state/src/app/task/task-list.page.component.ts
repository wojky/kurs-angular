import { Component, Input, computed, inject } from "@angular/core";
import { TasksListComponent } from "./ui/tasks-list.component";
import { Task } from "./model/Task";
import { ComponentListState, LIST_STATE_VALUE } from "../utils/list-state.type";
import { SubmitTextComponent } from "@ui/submit-text.component";
import {
  TasksListFiltersComponent,
  TasksListFiltersFormValue,
} from "./ui/task-list-filters.component";
import { getAllTasksSearchParams } from "./data-access/tasks-filters.adapter";
import { NgIconComponent } from "@ng-icons/core";
import { TasksKanbanViewComponent } from "./ui/tasks-kanban.component";
import { AppConfigStateService } from "../config/config.state.service";
import {
  TasksListViewMode,
  TasksListViewModeComponent,
} from "./ui/tasks-list-view-mode.component";
import { TasksService } from "./data-access/tasks.service";
import { GetAllTasksSearchParams } from "./data-access/tasks.api.service";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [
    TasksListComponent,
    SubmitTextComponent,
    TasksListFiltersComponent,
    NgIconComponent,
    TasksKanbanViewComponent,
    TasksListViewModeComponent,
  ],
  template: `
    <app-submit-text
      (submitText)="
        listState.state === listStateValue.SUCCESS && addTask($event, listState.results)
      "
    />
    <app-tasks-list-filters (filtersChange)="handleFiltersChange($event)" />

    <app-tasks-list-view-mode
      [$view]="$view()"
      (updateTasksListView)="configStateService.updateTasksListView($event)"
    />

    @switch (listState.state) {
      @case (listStateValue.SUCCESS) {
        @if ($view() === "list") {
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
})
export class TaskListPageComponent {
  @Input() projectId?: string;
  @Input() view?: TasksListViewMode;
  @Input() urgent?: boolean;

  private tasksService = inject(TasksService);

  configStateService = inject(AppConfigStateService);

  $view = computed(() => this.configStateService.$value().tasksListView);

  listState: ComponentListState<Task> = { state: LIST_STATE_VALUE.IDLE };
  listStateValue = LIST_STATE_VALUE;

  ngOnInit() {
    if (this.view) {
      this.configStateService.updateTasksListView(this.view);
    }

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
