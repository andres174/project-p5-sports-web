import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { clearScreenDown } from 'readline';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  constructor(
    private http:HttpClient
  ) { }

    guardarDisciplina(form:any){
      //console.log(form);debugger
      return this.http.post<any>(`${environment.apiUrl}disciplinas`,form)
    }

    mostrarDisciplinas(){
      return this.http.get<any>(`${environment.apiUrl}disciplinas`)
    }

    updateDisciplinas(form:any, id:any){
      return this.http.put<any>(`${environment.apiUrl}disciplinas/${id}`,form)
    }

    deleteDisciplina(id:any){
      return this.http.delete<any>(`${environment.apiUrl}disciplinas/${id}`)
    }

    deleteSelectDisciplinas(ids:any){
      const params= new FormData();
      params.append('ids',ids)
        return this.http.post<any>(`${environment.apiUrl}deleteSelectDisciplina`,params)
    }
}
