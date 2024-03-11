import { Injectable } from "@angular/core";
import { Task } from "../model/Task";
import { BehaviorSubject } from "rxjs";

const initialState = {
  tasks: [] as Task[],
  urgentCount: 0,
};

type TasksStateValue = typeof initialState;

@Injectable({ providedIn: "root" })
export class TasksStateService {
  private state$ = new BehaviorSubject(initialState);

  value$ = this.state$.asObservable();

  setTaskList(tasks: Task[]) {
    this.state$.next({
      tasks,
      urgentCount: tasks.filter((task) => task.urgent).length,
    });
  }

  addTask(task: Task) {
    this.state$.next({
      tasks: [...this.state$.value.tasks, task],
      urgentCount: task.urgent
        ? ++this.state$.value.urgentCount
        : --this.state$.value.urgentCount,
    });
  }

  updateTask(updatedTask: Task) {
    const updatedTasks = this.state$.value.tasks.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    this.state$.next({
      tasks: updatedTasks,
      urgentCount: updatedTask.urgent
        ? ++this.state$.value.urgentCount
        : --this.state$.value.urgentCount,
    });
  }

  removeTask(taskId: Task["id"]) {
    const updatedTasks = this.state$.value.tasks.filter((task) => {
      return task.id !== taskId;
    });

    this.state$.next({
      tasks: updatedTasks,
      urgentCount: updatedTasks.filter((task) => task.urgent).length,
    });
  }
}
