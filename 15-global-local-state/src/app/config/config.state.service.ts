import { Injectable, signal } from "@angular/core";
import { TasksListViewMode } from "../task/ui/tasks-list-view-mode.component";

type AppConfigState = {
  tasksListView: TasksListViewMode;
};

@Injectable({
  providedIn: "root",
})
export class AppConfigStateService {
  private state = signal<AppConfigState>({
    tasksListView: "list",
  });

  $value = this.state.asReadonly();

  updateTasksListView(value: TasksListViewMode) {
    this.state.update((state) => {
      return {
        ...state,
        tasksListView: value,
      };
    });
  }
}
