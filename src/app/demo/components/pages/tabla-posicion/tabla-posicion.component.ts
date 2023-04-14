import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultadoService } from 'src/app/demo/service/resultado.service';
import { TablaPosicion } from './tabla-posicion';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-tabla-posicion',
  templateUrl: './tabla-posicion.component.html',
  styleUrls: ['./tabla-posicion.component.scss'],
  providers: [MessageService],
})
export class TablaPosicionComponent implements OnInit {
  Tablaposicion: TablaPosicion[] = [];
 
  constructor(
    private ResultadoService: ResultadoService,
    private messageService: MessageService,
  ) {
   /*  this.url = environment.url; */
  }
  ngOnInit(){
  }

  getTablePosition(event:any){
    this.ResultadoService.MostrarTablePosition(event.detail.value).subscribe({
      next:(res)=> this.Tablaposicion = res,
      error:(err)=>console.log(err)
    });
  }

  successMessage(msg: string) {
    this.messageService.add({
      severity: "success",
      summary: "Acción exitosa",
      detail: msg,
      life: 3000,
    });
  }

  errorMessage(msg: string) {
    this.messageService.add({
      severity: "error",
      summary: "Ocurrio un Error",
      detail: msg,
      life: 3000,
    });
  }

}
