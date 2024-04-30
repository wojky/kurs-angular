import { NgComponentOutlet } from "@angular/common";
import { Component, Type, input } from "@angular/core";

export type ComponentCellDefinition<T> = {
  type: Type<any>;
  inputs?: (row: T) => Record<any, any>;
};

export type ColumnDefinition<T extends Record<any, any>> = {
  title: string;
  modelProp: keyof T;
  computeValue?: (row: T) => string;
  component?: ComponentCellDefinition<T>;
};

@Component({
  standalone: true,
  selector: "kwb-table",
  imports: [NgComponentOutlet],
  template: `
    <div [style.--nums-of-columns]="columnsConfig().length">
      <header class="kwb-table-row bg-emerald-500">
        @for (column of columnsConfig(); track $index) {
        <div class="kwb-table-cell">{{ column.title }}</div>
        }
      </header>

      @for (row of rows(); track $index) {
      <div class="kwb-table-row hover:bg-slate-100">
        @for (column of columnsConfig(); track $index) {
        <div class="kwb-table-cell">
          @if(column.component) {
          <ng-container
            *ngComponentOutlet="
              column.component.type;
              inputs: column.component.inputs ? column.component.inputs(row) : {}
            "
          />
          } @else if (column.computeValue) {
          {{ column.computeValue(row) }}
          } @else {
          {{ row[column.modelProp] }}
          }
        </div>
        }
      </div>
      }
    </div>
  `,
  styles: [
    `
      .kwb-table-row {
        display: grid;
        grid-template-columns: repeat(var(--nums-of-columns), 1fr);
        gap: 10px;
      }

      .kwb-table-cell {
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .kwb-table-cell > * {
        max-width: 100%;
      }
    `,
  ],
})
export class TableComponent<T extends { id: number }> {
  rows = input.required<T[]>();
  columnsConfig = input.required<ColumnDefinition<T>[]>();
}
