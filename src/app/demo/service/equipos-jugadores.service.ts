import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EquiposJugadoresService {
  constructor(private http: HttpClient) {}

  getEventosFromOrganizador(idOrganizador: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-eventos-from-organizador/${idOrganizador}`
    );
  }

  getEventoDisciplinasSmallFromEvento(idEvento: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-evento-disciplinas-small-from-evento/${idEvento}`
    );
  }

  getConfiguracion(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-configuracion/${id}`
    );
  }

}
