import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Character } from "./characters.model";

export type GetAllCharacterFilters = {
  name: string;
  status: Character["status"] | "";
  type: string;
  gender: Character["gender"] | "";
  species: string;
  page: number;
};

@Injectable({
  providedIn: "root",
})
export class CharactersApiService {
  private http = inject(HttpClient);

  getAll(filters: Partial<GetAllCharacterFilters>) {
    return this.http.get<{
      results: Character[];
    }>(`https://rickandmortyapi.com/api/character`, {
      params: new HttpParams({
        fromObject: {
          name: filters.name || "",
          status: filters.status?.toLowerCase() || "",
          gender: filters.gender || "",
          type: filters.type || "",
          species: filters.species || "",
          page: filters.page || 1,
        },
      }),
    });
  }
}
