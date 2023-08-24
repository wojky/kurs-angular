import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  template: ` <h1>Welcome to {{ title }}!</h1> `,
})
export class AppComponent {
  title = "01-components-basics-and-template-syntax1";
}
