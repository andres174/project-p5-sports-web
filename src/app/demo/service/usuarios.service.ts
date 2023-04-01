import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
}
