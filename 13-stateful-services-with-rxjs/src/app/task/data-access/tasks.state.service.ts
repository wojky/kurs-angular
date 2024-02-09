import { Injectable, signal } from "@angular/core";
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

  addTasks(tasks: Task[]) {
    const updatedTasks = [...this.state$.value.tasks, ...tasks];

    this.state$.next({
      tasks: updatedTasks,
      urgentCount: updatedTasks.filter((task) => task.urgent).length,
    });
  }

  updateTask(updatedTask: Task) {
    const updatedTasks = this.state$.value.tasks.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    this.state$.next({
      tasks: updatedTasks,
      urgentCount: updatedTasks.filter((task) => task.urgent).length,
    });
  }
}
