import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clearScreenDown } from 'readline';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {

  constructor(
    private http:HttpClient
  ) { }

  guardarPosiciones(form:any){
    //console.log(form);debugger
    return this.http.post<any>(`${environment.apiUrl}posiciones`,form)
  }

  mostrarPosiciones(){
    return this.http.get<any>(`${environment.apiUrl}posiciones`)
  }

  updatePosiciones(form:any, id:any){
    return this.http.put<any>(`${environment.apiUrl}posiciones/${id}`,form)
  }

  deletePosiciones(id:any){
    return this.http.delete<any>(`${environment.apiUrl}posiciones/${id}`)
  }
}
