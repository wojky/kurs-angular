import { Component, inject } from "@angular/core";
import { TasksListComponent } from "./ui/tasks-list.component";
import { Task } from "./model/Task";
import { NgIf } from "@angular/common";
import { TasksService } from "./data-access/tasks.service";
import { ComponentListState } from "../utils/list-state.type";
import { SubmitTextComponent } from "@ui/submit-text.component";
import { SORT_BY, SortBy } from "../shared/enums/sort-by.enum";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [TasksListComponent, SubmitTextComponent, NgIf],
  styles: [
    `
      details {
        border: 1px solid #aaa;
        border-radius: 4px;
        padding: 0.5em 0.5em 0;
        width: 300px;
        margin: 1em 0;
      }

      summary {
        font-weight: bold;
        margin: -0.5em -0.5em 0;
        padding: 0.5em;
      }

      summary:before {
        content: "👉";
        display: inline-block;
        font-size: 0.8em;
        padding: 0 0.5em;
        transition: transform 0.2s ease-in-out;
      }

      details[open] > summary:before {
        transform: rotate(90deg);
      }
    `,
  ],
  template: `
    <app-submit-text
      (submitText)="listState.state === 'success' && addTask($event, listState.results)"
    />

    <details open>
      <summary class="marker:content-none">Filters</summary>
      Tutaj wjadą filtry na grubo
    </details>
    <div class="flex gap-12">
      <button
        class="rounded px-2 py-1 transition-colors duration-300"
        [class.bg-green-400]="sortedBy === sortOptions.DESC"
        (click)="sort(sortOptions.DESC)"
      >
        📆🔽
      </button>
      <button
        class="rounded px-2 py-1 transition-colors duration-300"
        [class.bg-green-400]="sortedBy === sortOptions.ASC"
        (click)="sort(sortOptions.ASC)"
      >
        📆🔼
      </button>
    </div>
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

  sortOptions = SORT_BY;

  sortedBy: SortBy = SORT_BY.DESC;

  sort(stri: SortBy) {
    this.sortedBy = stri;
  }

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
