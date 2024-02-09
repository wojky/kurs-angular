import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: number) {
    return new Intl.DateTimeFormat("pl").format(value);
  }
}
