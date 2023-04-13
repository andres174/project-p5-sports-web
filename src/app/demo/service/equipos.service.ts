import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EquiposService {
  constructor(private http: HttpClient) {}

  getEquipos() {
    return this.http.get<any>(`${environment.apiUrl}equipos`);
  }

  storeEquipo(form: any) {
    return this.http.post<any>(`${environment.apiUrl}equipos`, form);
  }

  updateEquipo(form: any, id: any) {
    return this.http.put<any>(`${environment.apiUrl}equipos/${id}`, form);
  }

  updateLogoEquipo(form: FormData, id: any) {
    return this.http.post<any>(
      `${environment.apiUrl}edit-logo-equipo/${id}`,
      form
    );
  }

  deleteEquipo(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}equipos/${id}`);
  }

  deleteSelectedEquipos(ids: any[]) {
    const data = { ids };
    return this.http.post<any>(
      `${environment.apiUrl}delete-selected-equipos`,
      data
    );
  }
}
