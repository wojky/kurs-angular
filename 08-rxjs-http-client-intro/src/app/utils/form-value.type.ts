import { FormGroup } from "@angular/forms";

export type FormValue<T extends FormGroup> = ReturnType<T["getRawValue"]>;