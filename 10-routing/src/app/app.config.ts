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

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes, withComponentInputBinding())],
};
