import { Component, Input, booleanAttribute, computed, inject } from "@angular/core";
import { TasksListComponent } from "./ui/tasks-list.component";
import { LIST_STATE_VALUE } from "../utils/list-state.type";
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
import { AsyncPipe } from "@angular/common";

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
    AsyncPipe,
  ],
  template: `
    @if (listState$ | async; as listState) {
      <app-submit-text
        (submitText)="listState.state === listStateValue.SUCCESS && addTask($event)"
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
    }
  `,
})
export class TaskListPageComponent {
  @Input() projectId?: string;
  @Input() view?: TasksListViewMode;
  @Input({ transform: booleanAttribute }) urgent?: boolean;

  private tasksService = inject(TasksService);

  configStateService = inject(AppConfigStateService);
  $view = computed(() => this.configStateService.$value().tasksListView);
  listStateValue = LIST_STATE_VALUE;
  listState$ = this.tasksService.listState$;

  ngOnInit() {
    if (this.view) {
      this.configStateService.updateTasksListView(this.view);
    }
  }

  handleFiltersChange(filters: TasksListFiltersFormValue): void {
    this.getAllTasks(getAllTasksSearchParams({ ...filters, urgent: this.urgent }));
  }

  getAllTasks(searchParams: GetAllTasksSearchParams): void {
    this.projectId
      ? this.tasksService.getAllByProjectId(this.projectId, searchParams)
      : this.tasksService.getAll(searchParams);
  }

  addTask(name: string): void {
    this.tasksService.add(name);
  }
}
