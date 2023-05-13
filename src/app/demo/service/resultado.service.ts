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

  constructor(private http: HttpClient) {

   }

   saveResultado(form:any){
    return this.http.post<any>(`${environment.apiUrl}resultado`,form)
  }

  showResultado(){
    let id=localStorage.getItem('id')
    return this.http.get<any>(`${environment.apiUrl}resultado/${id}`)
  }

  updateResultado(form:any, id:any){
    return this.http.put<any>(`${environment.apiUrl}resultado/${id}`,form)
  }

  deleteResultado(id:any){
    return this.http.delete<any>(`${environment.apiUrl}resultado/${id}`)
  }
  
  deleteSelectResultado(ids:any){
    const params= new FormData();
    params.append('ids',ids)
      return this.http.post<any>(`${environment.apiUrl}deleteselectresultados`,params)
  }

  getEquipoDisciplina() {

    return this.http.get<any>(`${environment.apiUrl}get-Equipo-Disciplina`);

  }

  
  getPartido() {

    return this.http.get<any>(`${environment.apiUrl}get-partidos`);

  }

  MostrarTablePosition(id: number): Observable<TablaPosicion[]>{
    return this.http.get<TablaPosicion[]>(`${environment.apiUrl}tablaposicion/${id}`);
  }

  gettablaposicion(id: number) {
    return this.http.get<any>(`${environment.apiUrl}tablaposicion/${id}`);
  }
  
  gettablaGrupos(id: number) {
    return this.http.get<any>(`${environment.apiUrl}gettablaGrupos/${id}`);
  }


}
