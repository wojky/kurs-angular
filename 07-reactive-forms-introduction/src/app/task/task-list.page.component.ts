import { Component, inject } from "@angular/core";
import { TasksListComponent } from "./ui/tasks-list.component";
import { Task } from "./model/Task";
import { NgIf } from "@angular/common";
import { GetAllTasksSearchParams, TasksService } from "./data-access/tasks.service";
import { ComponentListState } from "../utils/list-state.type";
import { SubmitTextComponent } from "@ui/submit-text.component";
import { SORT_BY, SortBy } from "../shared/enums/sort-by.enum";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";

export const TODO_STATUS = {
  ALL: "ALL",
  TODO: "TODO",
  DONE: "DONE",
} as const;

type TodoStatus = keyof typeof TODO_STATUS;

type TasksListFiltersForm = FormGroup<{
  searchTerm: FormControl<string>;
  status: FormControl<TodoStatus>;
  sortBy: FormControl<SortBy>;
}>;

type TasksListFiltersFormValue = ReturnType<TasksListFiltersForm["getRawValue"]>;

function getAllTasksSearchParams(
  formValue: TasksListFiltersFormValue
): GetAllTasksSearchParams {
  let searchParams = {
    _sort: "createdAt",
    _order: formValue.sortBy.toLocaleLowerCase(),
    q: formValue.searchTerm,
  } as GetAllTasksSearchParams;

  if (formValue.status === "TODO") {
    searchParams.done_like = "false";
  } else if (formValue.status === "DONE") {
    searchParams.done_like = "true";
  } else {
    searchParams.done_like = "";
  }

  return searchParams;
}

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [TasksListComponent, SubmitTextComponent, NgIf, ReactiveFormsModule],
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
    <form [formGroup]="form">
      <details open>
        <summary class="marker:content-none">Filters</summary>
        <div class="mb-2 flex justify-between">
          <fieldset class="flex flex-col">
            <label for="filter-search-term">Search</label>
            <input
              formControlName="searchTerm"
              id="filter-search-term"
              class="border-b border-b-orange-400 outline-none"
            />
          </fieldset>

          <fieldset class="flex flex-col">
            <label for="filter-status">Status</label>
            <select
              formControlName="status"
              id="filter-status"
              class="border border-orange-400 outline-none"
            >
              <option [value]="statusOptions.ALL">-</option>
              <option [value]="statusOptions.DONE">Done</option>
              <option [value]="statusOptions.TODO">Todo</option>
            </select>
          </fieldset>
        </div>
      </details>
      <div class="flex gap-12">
        <button
          class="rounded px-2 py-1 transition-colors duration-300"
          [class.bg-green-400]="form.controls.sortBy.value === sortOptions.DESC"
          (click)="sort(sortOptions.DESC)"
        >
          📆🔽
        </button>
        <button
          class="rounded px-2 py-1 transition-colors duration-300"
          [class.bg-green-400]="form.controls.sortBy.value === sortOptions.ASC"
          (click)="sort(sortOptions.ASC)"
        >
          📆🔼
        </button>
      </div>
    </form>
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
  private formBuilder = inject(NonNullableFormBuilder);

  form: TasksListFiltersForm = this.formBuilder.group({
    searchTerm: this.formBuilder.control<string>(""),
    sortBy: this.formBuilder.control<SortBy>("ASC"),
    status: this.formBuilder.control<TodoStatus>(TODO_STATUS.ALL),
  });

  sortOptions = SORT_BY;
  statusOptions = TODO_STATUS;

  sortedBy: SortBy = SORT_BY.DESC;

  sort(sort: SortBy) {
    this.form.patchValue({
      sortBy: sort,
    });
  }

  ngOnInit() {
    this.listState = { state: "loading" };

    this.form.valueChanges.subscribe(() => {
      this.getAllTasks(getAllTasksSearchParams(this.form.getRawValue()));
    });

    this.getAllTasks(getAllTasksSearchParams(this.form.getRawValue()));
  }

  getAllTasks(searchParams: GetAllTasksSearchParams) {
    this.tasksService.getAll(searchParams).then((response) => {
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
