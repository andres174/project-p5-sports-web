import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoDisciplinaService {

  constructor(private http: HttpClient) {

   }

   getEventos() {

    return this.http.get<any>(`${environment.apiUrl}get-eventos`);

  }

  getDisciplina() {

    return this.http.get<any>(`${environment.apiUrl}get-disciplinas`);

  }

  getConfiguracion() {

    return this.http.get<any>(`${environment.apiUrl}get-config`);

  }

  generarEventoDiciplina(form: any) {

    return this.http.post<any>(`${environment.apiUrl}generar-grupos-auto`, form);

  }


}
