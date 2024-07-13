import { Component, inject, signal } from "@angular/core";
import {
  FormResetEvent,
  FormSubmittedEvent,
  NonNullableFormBuilder,
  PristineChangeEvent,
  ReactiveFormsModule,
  TouchedChangeEvent,
} from "@angular/forms";

@Component({
  selector: "app-root",
  styles: [
    `
      :host {
        font-family: system-ui;
      }

      label {
        display: flex;
        justify-content: space-between;
        padding-bottom: 1rem;
      }

      button {
        margin-right: 0.5rem;
      }
    `,
  ],
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>The Form</h1>

    <form [formGroup]="form">
      <label> name <input formControlName="name" /> </label>
      <label> surname <input formControlName="surname" /> </label>

      <button [disabled]="submitted() || form.pristine">send</button>
      <button type="reset">reset</button>
    </form>

    @if(submitted()) {
    <p>
      Form completed in: <strong> {{ time() / 1000 }}s</strong>
    </p>
    }
  `,
})
export class AppComponent {
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control(""),
    surname: this.fb.control(""),
  });

  time = signal(0);
  submitted = signal(false);

  ngOnInit() {
    this.form.events.subscribe((event) => {
      if (event instanceof PristineChangeEvent) {
        this.time.set(Date.now());
      }

      if (event instanceof TouchedChangeEvent) {
      }

      if (event instanceof FormSubmittedEvent) {
        this.submitted.set(true);
        this.time.update((time) => Date.now() - time);
      }

      if (event instanceof FormResetEvent) {
        this.submitted.set(false);
        this.time.set(0);
      }
    });
  }
}
