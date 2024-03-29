import { Injectable, inject } from "@angular/core";
import { Task } from "../model/Task";
import { HttpClient } from "@angular/common/http";

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
export class TasksApiService {
  private URL = "http://localhost:3000";

  private http = inject(HttpClient);

  getAll(searchParams?: GetAllTasksSearchParams) {
    return this.http.get<Task[]>(`${this.URL}/tasks`, {
      observe: "response",
      params: searchParams,
    });
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
