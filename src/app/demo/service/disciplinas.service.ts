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

}
