import { ApplicationConfig } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { Routes, provideRouter, withComponentInputBinding } from "@angular/router";
import { ProjectListPageComponent } from "./project/project-list.page.component";
import { TaskListPageComponent } from "./task/task-list.page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full",
  },
  {
    path: "projects",
    component: ProjectListPageComponent,
  },
  {
    path: "tasks",
    children: [
      {
        path: "",
        component: TaskListPageComponent,
      },
      {
        path: ":id",
        component: TaskListPageComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "tasks",
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes, withComponentInputBinding())],
};
