import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  mostrarUsuarios() {
    return this.http.get<any>(`${environment.apiUrl}usuarios`);
  }

  mostrarOrganizadores() {
    return this.http.get<any>(`${environment.apiUrl}organizadores`);
  }

  guardarUsuario(form: any) {
    return this.http.post<any>(`${environment.apiUrl}usuarios`, form);
  }

  updateUsuario(form: any, id: any) {
    return this.http.put<any>(`${environment.apiUrl}usuarios/${id}`, form);
  }

  updateEmailUsuario(form: any, id: any) {
    return this.http.post<any>(
      `${environment.apiUrl}edit-email-usuario/${id}`,
      form
    );
  }

  updatePasswordUsuario(form: any, id: any) {
    return this.http.post<any>(
      `${environment.apiUrl}edit-password-usuario/${id}`,
      form
    );
  }

  updateFotoPerfilUsuario(form: FormData, id: any) {
    return this.http.post<any>(
      `${environment.apiUrl}edit-foto-usuario/${id}`,
      form
    );
  }

  deleteUsuario(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}usuarios/${id}`);
  }

  deleteSelectedUsuarios(ids: any[]) {
    const data = { ids };
    return this.http.post<any>(
      `${environment.apiUrl}delete-selected-usuarios`,
      data
    );
  }
}
