import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root",
  })
  export class EventService {
    constructor(private http: HttpClient) {}
  
    guardarEvento(form:any){
        return this.http.post<any>(`${environment.apiUrl}Evento`,form)
      }
    
      mostrarEvento(){
        return this.http.get<any>(`${environment.apiUrl}Evento`)
      }
    
      updateEvento(form:any, id:any){
        return this.http.put<any>(`${environment.apiUrl}Evento/${id}`,form)
      }
    
      deleteEvento(id:any){
        return this.http.delete<any>(`${environment.apiUrl}Evento/${id}`)
      }
    
      editimagenEvento(form: FormData, id: any) {
        return this.http.post<any>(
          `${environment.apiUrl}edit-imagen-evento/{id}`,
          form
        );
      }
    
      deleteSelectedEvento(ids:any){
        const params= new FormData();
        params.append('ids',ids)
         return this.http.post<any>(`${environment.apiUrl}deleteselectevento`,params)
      }
  }
  