import { Component, effect, inject, input, signal } from "@angular/core";
import { ColumnDefinition, TableComponent } from "../shared/table.component";
import { CharactersApiService, GetAllCharacterFilters } from "./characters.api.service";
import { Character } from "./characters.model";

@Component({
  standalone: true,
  selector: "kwb-table-image-cell",
  template: ` <img class="w-3/4" [src]="url()" alt="" /> `,
})
export class TableImageCellComponent {
  url = input.required<string>();
}

@Component({
  standalone: true,
  selector: "kwb-characters-page",
  imports: [TableComponent],
  template: ` <kwb-table [rows]="characters()" [columnsConfig]="charactersTableColumnsConfig" /> `,
  styles: [
    `
      .kwb-table-row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
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
export class CharactersPageComponent {
  private backend = inject(CharactersApiService);
  characters = signal<Character[]>([]);

  charactersTableColumnsConfig: ColumnDefinition<Character>[] = [
    {
      title: "ID",
      modelProp: "id",
    },
    {
      title: "Name",
      modelProp: "name",
    },
    {
      title: "Status",
      modelProp: "status",
    },
    {
      title: "Living on Earth",
      modelProp: "location",
      computeValue: ({ location }) => (location.name.includes("Earth") ? "✅" : "❌"),
    },
    {
      title: "",
      modelProp: "image",
      component: {
        type: TableImageCellComponent,
        inputs: (character) => {
          return {
            url: character.image,
          };
        },
      },
    },
  ];

  filters = signal<GetAllCharacterFilters>({
    name: "",
    status: "",
    gender: "",
    type: "",
    species: "",
    page: 1,
  });

  constructor() {
    effect(
      () => {
        this.backend.getAll(this.filters()).subscribe((response) => {
          console.table(response.results, ["id", "name", "status"]);
          this.characters.set(response.results);
        });
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
