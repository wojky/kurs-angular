import { Injectable, inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  GetAllTasksSearchParams,
  TaskUpdatePayload,
  TasksApiService,
} from "./tasks.api.service";
import { tap } from "rxjs";
import { TasksStateService } from "./tasks.state.service";
import { createListState } from "src/app/utils/create-list-state";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private httpService = inject(TasksApiService);
  public state = inject(TasksStateService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.tasks,
  );

  getAll(searchParams?: GetAllTasksSearchParams): void {
    this.httpService
      .getAll(searchParams)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setTaskList(response.body);
          }
        }),
      )
      .subscribe();
  }

  getAllByProjectId(projectId: string, searchParams: GetAllTasksSearchParams) {
    this.httpService
      .getAllByProjectId(projectId, searchParams)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setTaskList(response.body);
          }
        }),
      )
      .subscribe();
  }

  delete(taskId: number) {
    return this.httpService.delete(taskId).pipe(
      tap(() => {
        this.state.removeTask(taskId);
      }),
    );
  }

  update(taskId: number, payload: TaskUpdatePayload) {
    return this.httpService.update(taskId, payload).pipe(
      tap((task) => {
        this.state.updateTask(task);
      }),
    );
  }

  add(name: string) {
    return this.httpService.add(name).pipe(
      tap((task) => {
        this.state.addTask(task);
      }),
    );
  }
}
