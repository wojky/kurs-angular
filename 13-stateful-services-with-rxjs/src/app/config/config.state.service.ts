import { Injectable, signal } from "@angular/core";

export type TasksListView = "kanban" | "list";

type AppConfigState = {
  tasksListView: TasksListView;
};

@Injectable({
  providedIn: "root",
})
export class AppConfigStateService {
  private state = signal<AppConfigState>({
    tasksListView: "list",
  });

  $value = this.state.asReadonly();

  updateTasksListView(value: TasksListView) {
    this.state.update((state) => {
      return {
        ...state,
        tasksListView: value,
      };
    });
  }
}
