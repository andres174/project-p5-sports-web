import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http: HttpClient) {

  }

  getEventos(){

    return this.http.get<any>(`${environment.apiUrl}get-all-eventos`);

  }

  getOneEventoDisciplina(id:number){

    return this.http.get<any>(`${environment.apiUrl}get-one-eventos-discplinas/${id}`);

  }

  getEquiposFromOneDisciplina(id:number){

    return this.http.get<any>(`${environment.apiUrl}get-equipos-discplinas/${id}`);

  }


}
