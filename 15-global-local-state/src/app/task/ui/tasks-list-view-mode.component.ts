import { Component, EventEmitter, Output, input } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherColumns, featherList } from "@ng-icons/feather-icons";

export type TasksListViewMode = "kanban" | "list";

@Component({
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ featherList, featherColumns })],
  selector: "app-tasks-list-view-mode",
  template: `
    <div class="flex gap-4 items-center my-4">
      <span> View mode:</span>
      <button
        (click)="updateTasksListView.emit('list')"
        class="flex"
        [class.text-green-500]="$view() === 'list'"
      >
        <ng-icon name="featherList" />
      </button>
      <button
        (click)="updateTasksListView.emit('kanban')"
        class="flex"
        [class.text-green-500]="$view() === 'kanban'"
      >
        <ng-icon name="featherColumns" />
      </button>
    </div>
  `,
})
export class TasksListViewModeComponent {
  $view = input<TasksListViewMode>("list");

  @Output() updateTasksListView = new EventEmitter<TasksListViewMode>();
}
