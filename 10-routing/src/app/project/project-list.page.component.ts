import { Component, inject } from "@angular/core";
import { Project } from "./model/Project";
import { NgFor, NgIf } from "@angular/common";
import { ComponentListState, LIST_STATE_VALUE } from "../utils/list-state.type";
import { SubmitTextComponent } from "@ui/submit-text.component";
import { ProjectsApiService } from "./data-access/projects.api.service";

@Component({
  selector: "app-project-list-page",
  standalone: true,
  imports: [SubmitTextComponent, NgIf, NgFor],
  template: `
    <p>Projekty:</p>
    <app-submit-text
      (submitText)="
        listState.state === listStateValue.SUCCESS &&
          addProject($event, listState.results)
      "
    />

    <ol
      class="list-decimal list-inside"
      *ngIf="listState.state === listStateValue.SUCCESS"
    >
      <li *ngFor="let project of listState.results">{{ project.name }}</li>
    </ol>

    <p *ngIf="listState.state === listStateValue.ERROR">
      {{ listState.error.message }}
    </p>
    <p *ngIf="listState.state === listStateValue.LOADING">Loading...</p>
  `,
})
export class ProjectListPageComponent {
  private projectsApiService = inject(ProjectsApiService);

  listState: ComponentListState<Project> = { state: LIST_STATE_VALUE.IDLE };
  listStateValue = LIST_STATE_VALUE;

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.listState = { state: LIST_STATE_VALUE.LOADING };

    this.projectsApiService.getAll().subscribe({
      next: (projects) => {
        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: projects,
        };
      },
      error: (err) => {
        this.listState = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }

  addProject(name: string, projects: Project[]): void {
    this.projectsApiService.add(name).subscribe({
      next: (project) => {
        this.listState = {
          state: LIST_STATE_VALUE.SUCCESS,
          results: projects.concat(project),
        };
      },
      error: (err) => {
        this.listState = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }
}
