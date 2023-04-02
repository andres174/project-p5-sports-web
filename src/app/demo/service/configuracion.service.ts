import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(
    private http:HttpClient
  ) { 

  }

  saveConfiguracion(form:any){
    return this.http.post<any>(`${environment.apiUrl}configuracion`,form)
  }


  showConfiguraciones(){
    let id=3
    return this.http.get<any>(`${environment.apiUrl}configuracion/${id}`)
  }

  updateConfiguracion(form:any, id:any){
    return this.http.put<any>(`${environment.apiUrl}configuracion/${id}`,form)
  }

  deleteConfiguracion(id:any){
    return this.http.delete<any>(`${environment.apiUrl}configuracion/${id}`)
  }
}
