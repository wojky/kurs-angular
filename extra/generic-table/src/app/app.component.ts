import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="bg-zinc-600 h-8"></div>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = "generic-table";
}
