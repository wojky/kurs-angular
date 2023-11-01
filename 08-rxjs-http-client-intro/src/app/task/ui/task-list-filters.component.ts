import { Component, EventEmitter, Output, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { SortBy, SORT_BY } from "src/app/shared/enums/sort-by.enum";
import { TaskStatus, TASK_STATUS } from "../model/task-status.enum";
import { FormValue } from "src/app/utils/form-value.type";
import { startWith } from "rxjs";

type TasksListFiltersForm = FormGroup<{
  searchTerm: FormControl<string>;
  status: FormControl<TaskStatus>;
  sortBy: FormControl<SortBy>;
}>;

export type TasksListFiltersFormValue = FormValue<TasksListFiltersForm>;

@Component({
  standalone: true,
  selector: "app-tasks-list-filters",
  imports: [ReactiveFormsModule],
  template: `
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
  `,
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
})
export class TasksListFiltersComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  @Output() filtersChange = new EventEmitter<TasksListFiltersFormValue>();

  form: TasksListFiltersForm = this.formBuilder.group({
    searchTerm: this.formBuilder.control<string>(""),
    sortBy: this.formBuilder.control<SortBy>(SORT_BY.ASC),
    status: this.formBuilder.control<TaskStatus>(TASK_STATUS.ALL),
  });

  protected sortOptions = SORT_BY;
  protected statusOptions = TASK_STATUS;

  sort(sort: SortBy) {
    this.form.patchValue({
      sortBy: sort,
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.filtersChange.emit(this.form.getRawValue());
    });
  }
}
