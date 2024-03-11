import { Injectable, inject } from "@angular/core";
import { Project } from "../model/Project";
import { HttpClient } from "@angular/common/http";

type GetAllProjectsSearchParams = {};

@Injectable({
  providedIn: "root",
})
export class ProjectsApiService {
  private URL = "http://localhost:3000";

  private http = inject(HttpClient);

  getAll(searchParams?: GetAllProjectsSearchParams) {
    return this.http.get<Project[]>(`${this.URL}/projects`, {
      params: searchParams,
    });
  }

  add(name: string) {
    return this.http.post<Project>(`${this.URL}/projects`, { name });
  }
}
