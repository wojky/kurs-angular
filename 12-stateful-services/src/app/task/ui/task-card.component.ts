import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../model/Task";
import { RemoveItemButtonComponent } from "@ui/remove-item-button.component";
import { AutosizeTextareaComponent } from "@ui/autosize-textarea.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { TaskUpdatePayload } from "../data-access/tasks.service";
import { CustomDatePipe } from "src/app/utils/pipes/custom-date.pipe";
import { bootstrapBookmark, bootstrapBookmarkFill } from "@ng-icons/bootstrap-icons";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [
    RemoveItemButtonComponent,
    CustomDatePipe,
    AutosizeTextareaComponent,
    NgIconComponent,
  ],
  template: `
    <div class="rounded-md shadow-md p-4 block" [class.bg-green-300]="task.done">
      <button
        class="w-full"
        (click)="!editMode && handleSingleClick()"
        (dblclick)="switchToEditMode()"
      >
        <header class="flex justify-end">
          <app-remove-item-button (confirm)="delete.emit()" />
        </header>
        <section class="text-left">
          @if (editMode) {
            <app-autosize-textarea
              (keyup.escape)="editMode = false"
              (submitText)="updateTaskName($event)"
              [value]="task.name"
            />
          } @else {
            <span [class.line-through]="task.done">
              {{ task.name }}
            </span>
          }
        </section>
        <footer class=" pt-2 flex justify-between">
          <button
            class="flex items-center"
            (click)="updateTaskUrgentStatus(); $event.stopPropagation()"
          >
            <ng-icon
              [name]="task.urgent ? 'bootstrapBookmarkFill' : 'bootstrapBookmark'"
              class="text-sm"
            />
          </button>
          <div class="flex items-center justify-end">
            <span class="text-xs pr-1">{{ task.createdAt | customDate }} </span>
            <ng-icon name="featherCalendar" class="text-sm" />
          </div>
        </footer>
      </button>
    </div>
  `,
  styles: [],
  viewProviders: [provideIcons({ bootstrapBookmarkFill, bootstrapBookmark })],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() update = new EventEmitter<TaskUpdatePayload>();
  @Output() delete = new EventEmitter<void>();

  editMode = false;

  isSingleClick = true;

  updateTaskUrgentStatus() {
    this.update.emit({ urgent: !this.task.urgent });
  }

  updateTaskName(updatedName: string) {
    this.update.emit({ name: updatedName });

    this.editMode = false;
  }

  handleSingleClick() {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.update.emit({ done: !this.task.done });
      }
    }, 200);
  }

  switchToEditMode() {
    this.isSingleClick = false;
    this.editMode = true;
  }
}
