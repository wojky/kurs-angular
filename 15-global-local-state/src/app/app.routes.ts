import { Routes } from "@angular/router";
import { ProjectListPageComponent } from "./project/project-list.page.component";
import { TaskListPageComponent } from "./task/task-list.page.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full",
  },
  {
    path: "projects",
    component: ProjectListPageComponent,
    title: "Projekty",
  },
  {
    path: "tasks",
    title: "Zadania",
    children: [
      {
        path: "",
        component: TaskListPageComponent,
      },
      {
        path: "urgent",
        data: {
          urgent: true,
        },
        component: TaskListPageComponent,
      },
      {
        path: ":projectId",
        component: TaskListPageComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "tasks",
  },
];
