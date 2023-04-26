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

  getEventoDisciplinasFullByEvento(idEvento: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-evento-disciplinas-full-by-evento/${idEvento}`
    );
  }

  getEquipoDisciplinasByDisciplina(idEventoDisciplina: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-equipo-disciplinas-by-disciplina/${idEventoDisciplina}`
    );
  }

  getJugadorEquiposByEquipoDisciplina(idEquipoDisciplina: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-jugador-equipos-by-equipo-disciplina/${idEquipoDisciplina}`
    );
  }

  storeJugadorEquipo(form: any) {
    return this.http.post<any>(`${environment.apiUrl}jugador-equipos`, form);
  }

  updateJugadorEquipo(form: any, id: number) {
    return this.http.put<any>(
      `${environment.apiUrl}jugador-equipos/${id}`,
      form
    );
  }

  deleteJugadorEquipo(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}jugador-equipos/${id}`);
  }

  deleteSelectedJugadorEquipos(ids: number[]) {
    const data = { ids };
    return this.http.post<any>(
      `${environment.apiUrl}delete-selected-jugador-equipos`,
      data
    );
  }
}
