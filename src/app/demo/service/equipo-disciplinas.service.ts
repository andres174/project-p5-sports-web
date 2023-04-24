import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EquipoDisciplinasService {
  constructor(private http: HttpClient) {}

  getEventosByOrganizador(idOrganizador: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-eventos-by-organizador/${idOrganizador}`
    );
  }

  getEventoDisciplinasFullByEvento(idEvento: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-evento-disciplinas-full-by-evento/${idEvento}`
    );
  }

  getEquiposByDisciplina(id_evento_disciplina: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-equipos-by-disciplina/${id_evento_disciplina}`
    );
  }

  getEquipos() {
    return this.http.get<any>(`${environment.apiUrl}equipos`);
  }
}
