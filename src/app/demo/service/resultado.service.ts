import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../api/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TablaPosicion } from 'src/app/demo/components/pages/tabla-posicion/tabla-posicion';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private http: HttpClient) { }

  getEventos() {
    return this.http.get<any>(`${environment.apiUrl}get-all-eventos`);
  }

  getEquiposFromOneDisciplina(id: number) {

    return this.http.get<any>(`${environment.apiUrl}get-equipos-discplinas/${id}`);

  }

  getConfiguracionFromEventoDisciplina(id: number) {

    return this.http.get<any>(`${environment.apiUrl}get-config-eventos-discplina/${id}`);

  }



  MostrarTablePosition(id: number): Observable<TablaPosicion[]>{
    return this.http.get<TablaPosicion[]>(`${environment.apiUrl}tablaposicion/${id}`);
  }




}
