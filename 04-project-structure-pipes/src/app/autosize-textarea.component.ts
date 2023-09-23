import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-autosize-textarea",
  standalone: true,
  template: `
    <textarea
      #textarea
      [placeholder]="placeholder"
      [value]="value"
      class="resize-none overflow-hidden focus:outline-orange-400 w-full"
      (click)="$event.stopPropagation()"
      (keyup.enter)="submitText.emit(textarea.value); textarea.value = ''"
      (input)="calcHeight(textarea)"
    ></textarea>
  `,
  styles: [],
})
export class AutosizeTextareaComponent {
  @Input() placeholder = "";
  @Input() value = "";

  @Output() submitText = new EventEmitter<string>();

  protected calcHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + "px";
  }
}
