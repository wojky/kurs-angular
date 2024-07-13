import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";

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

      <button [disabled]="form.pristine">send</button>
      <button type="reset">reset</button>
    </form>

    <p>Form completed in: <strong> &lt;time&gt;</strong></p>
  `,
})
export class AppComponent {
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: this.fb.control(""),
    surname: this.fb.control(""),
  });

  ngOnInit() {}
}
