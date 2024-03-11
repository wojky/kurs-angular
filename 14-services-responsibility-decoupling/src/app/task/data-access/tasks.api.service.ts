import { Injectable, computed, inject, signal } from "@angular/core";
import { Task } from "../model/Task";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FetchingError } from "src/app/utils/list-state.type";
import { EMPTY, Observable, catchError, delay, tap } from "rxjs";

export type TaskUpdatePayload = { done?: boolean; name?: string; urgent?: boolean };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

export type GetAllTasksSearchParams = {
  q: string;
  _sort: "createdAt";
  _order: "desc" | "asc";
  done_like: "true" | "false" | "";
  urgent_like: "true" | "";
};

@Injectable({
  providedIn: "root",
})
export class TasksApiService {
  private URL = "http://localhost:3000";

  private http = inject(HttpClient);

  private $idle = signal(true);
  private $loading = signal(false);
  private $error = signal<FetchingError | null>(null);

  $loadingState = computed(() => {
    return {
      idle: this.$idle(),
      loading: this.$loading(),
      error: this.$error(),
    };
  });

  withLoadingState<T>(source$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$loading.set(true);
    this.$error.set(null);

    return source$.pipe(
      catchError((e: HttpErrorResponse) => {
        this.$error.set({ message: e.message, status: e.status });
        this.$loading.set(false);

        return EMPTY;
      }),
      tap(() => {
        this.$loading.set(false);
      }),
    );
  }

  getAll(searchParams?: GetAllTasksSearchParams) {
    return this.withLoadingState(
      this.http
        .get<Task[]>(`${this.URL}/tasks`, {
          observe: "response",
          params: searchParams,
        })
        .pipe(delay(1000)),
    );
  }

  getAllByProjectId(projectId: string, searchParams: GetAllTasksSearchParams) {
    return this.http.get<Task[]>(`${this.URL}/tasks`, {
      observe: "response",
      params: { ...searchParams, projectId },
    });
  }

  delete(taskId: number) {
    return this.http.delete(`${this.URL}/tasks/${taskId}`);
  }

  update(taskId: number, payload: TaskUpdatePayload) {
    return this.http.patch<Task>(`${this.URL}/tasks/${taskId}`, payload);
  }

  add(name: string) {
    return this.http.post<Task>(`${this.URL}/tasks`, { name });
  }
}
