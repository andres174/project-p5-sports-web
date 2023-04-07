import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clearScreenDown } from 'readline';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(
    private http:HttpClient
  ) { }

  guardarJugadores(form:any){
    return this.http.post<any>(`${environment.apiUrl}jugadores`,form)
  }

  mostrarJugadores(){
    return this.http.get<any>(`${environment.apiUrl}jugadores`)
  }

  updateJugadores(form:any, id:any){
    return this.http.put<any>(`${environment.apiUrl}jugadores/${id}`,form)
  }

  deleteJugadores(id:any){
    return this.http.delete<any>(`${environment.apiUrl}jugadores/${id}`)
  }

/*   editImageJugadores(form:any){
    console.log(form);
    const params = new FormData();
    params.append('foto', form.foto);
    return this.http.post<any>(`${environment.apiUrl}edit-foto-jugador/${form.id}`,params)
  } */

  editImageJugadores(form: FormData, id: any) {
    return this.http.post<any>(
      `${environment.apiUrl}edit-foto-jugador/${id}`,
      form
    );
  }

  deleteSelectJugadores(ids:any){
    const params= new FormData();
    params.append('ids',ids)
      return this.http.post<any>(`${environment.apiUrl}deleteSelectjugador`,params)
  }
}
