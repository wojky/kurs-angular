import { Injectable, inject } from "@angular/core";
import { Task } from "../model/Task";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { TasksStateService } from "./tasks.state.service";

export type TaskUpdatePayload = { done?: boolean; name?: string; urgent?: boolean };

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
export class TasksService {
  private URL = "http://localhost:3000";

  private http = inject(HttpClient);
  private state = inject(TasksStateService);

  getAll(searchParams?: GetAllTasksSearchParams) {
    return this.http
      .get<Task[]>(`${this.URL}/tasks`, {
        observe: "response",
        params: searchParams,
      })
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setTaskList(response.body);
          }
        }),
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
    return this.http.patch<Task>(`${this.URL}/tasks/${taskId}`, payload).pipe(
      tap((response) => {
        this.state.updateTask(response);
      }),
    );
  }

  add(name: string) {
    return this.http.post<Task>(`${this.URL}/tasks`, { name });
  }
}
