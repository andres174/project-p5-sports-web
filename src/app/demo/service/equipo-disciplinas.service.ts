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

  getEquipoDisciplinasByDisciplina(idEventoDisciplina: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-equipo-disciplinas-by-disciplina/${idEventoDisciplina}`
    );
  }

  getEquiposToAddByDisciplina(idEventoDisciplina: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-equipos-to-add-by-disciplina/${idEventoDisciplina}`
    );
  }

  storeEquipoDisciplina(form: any) {
    return this.http.post<any>(`${environment.apiUrl}equipo-disciplinas`, form);
  }

  deleteEquipoDisciplina(id: number) {
    return this.http.delete<any>(
      `${environment.apiUrl}equipo-disciplinas/${id}`
    );
  }

  deleteSelectedEquipoDisciplina(ids: number[]) {
    const data = { ids };
    return this.http.post<any>(
      `${environment.apiUrl}delete-selected-equipo-disciplinas`,
      data
    );
  }
}
