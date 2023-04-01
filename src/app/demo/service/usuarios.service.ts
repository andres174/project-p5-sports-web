import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<any>(`${environment.apiUrl}usuarios`);
  }

  getOrganizadores() {
    return this.http.get<any>(`${environment.apiUrl}organizadores`);
  }

  deleteUsuario(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}usuarios/${id}`);
  }

  deleteUsuarios(ids: any[]) {
    return forkJoin(
      ids.map((id) =>
        this.http.delete<any>(`${environment.apiUrl}usuarios/${id}`)
      )
    );
  }
}
