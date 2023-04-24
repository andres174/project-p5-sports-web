import { Component, OnInit } from '@angular/core';
import { EventoDisciplinaService } from 'src/app/demo/service/evento-disciplina.service';
import { GruposService } from 'src/app/demo/service/grupos-service/grupos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evento-disciplina',
  templateUrl: './evento-disciplina.component.html',

})
export class EventoDisciplinaComponent implements OnInit{

   //logo equipo
   imagen_evento_url = environment.equipoUrl;

   // booleans
   is_generar_grupos_clicked: boolean = false;
   //is_equipos_and_config_loaded: boolean = false;

   //arrays & selecteds
   eventos: any[] = [];
   evento_selected: any;
   //is_evento_selected: boolean = true; // para el disable

   disciplina: any[] = [];
   disciplina_selected: any;

   //equipos_disciplina: any[] = [];
   //array_equipos_disciplina: any[] = [];

   configuracion: any[] = [];
   configuracion_selected: any;

   //ngStyle 
   //margen
   margen = {
       'margin-bottom.em': '2'
   }

   
  constructor(
    private eventoDisciplinaService: EventoDisciplinaService
    ) {

}

ngOnInit(): void {
    this.getEventos();
    this.getDisciplina();
    this.getConfiguracion();
}

getEventos() {
    this.eventoDisciplinaService.getEventos().subscribe({
      next: (value) => {
          this.eventos = value;
      },
      error: (err) => {
          console.log(err);
      }
  });
}


getDisciplina() {
  this.eventoDisciplinaService.getDisciplina().subscribe({  
    next: (value) => {
        debugger
          this.disciplina = value;
          debugger
      },
      error: (err) => {
          console.log(err);
          debugger
      }
  });
}

getConfiguracion() {
  this.eventoDisciplinaService.getConfiguracion().subscribe({
      next: (value) => {
          this.configuracion = value;
      },
      error: (err) => {
          console.log(err);
      }
  });
}

}
