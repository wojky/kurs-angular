import { Injectable, inject } from "@angular/core";
import { Task } from "../model/Task";
import {
  GetAllTasksSearchParams,
  TaskUpdatePayload,
  TasksApiService,
} from "./tasks.api.service";
import { tap } from "rxjs";
import { TasksStateService } from "./tasks.state.service";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private httpService = inject(TasksApiService);
  public state = inject(TasksStateService);

  getAll(searchParams?: GetAllTasksSearchParams) {
    return this.httpService.getAll(searchParams).pipe(
      tap((response) => {
        if (response.body) {
          this.state.setTaskList(response.body);
        }
      }),
    );
  }

  getAllByProjectId(projectId: string, searchParams: GetAllTasksSearchParams) {
    return this.httpService.getAllByProjectId(projectId, searchParams).pipe(
      tap((response) => {
        if (response.body) {
          this.state.setTaskList(response.body);
        }
      }),
    );
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
