import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class JugadorEquiposService {
  constructor(private http: HttpClient) {}

  getEventosByOrganizador(idOrganizador: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-eventos-by-organizador/${idOrganizador}`
    );
  }

  getEventoDisciplinasByEvento(idEvento: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-evento-disciplinas-by-evento/${idEvento}`
    );
  }

  getConfiguracion(id: number) {
    return this.http.get<any>(`${environment.apiUrl}get-configuracion/${id}`);
  }

  getEquiposByDisciplina(id_evento_disciplina: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-equipos-by-disciplina/${id_evento_disciplina}`
    );
  }
}
