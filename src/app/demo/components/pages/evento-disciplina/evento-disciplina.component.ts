import { Component } from '@angular/core';
import { EventoDisciplinaService } from 'src/app/demo/service/evento-disciplina.service';

@Component({
  selector: 'app-evento-disciplina',
  templateUrl: './evento-disciplina.component.html',

})
export class EventoDisciplinaComponent {

  isLoadTable: boolean = false;

  eventos: any[] = [];
  evento_selected: any;

  equipos: any[] = [];
  array_equipos_disciplina: any[] = [];

  configuracion: any[] = [];
  configuracio_select: any;

  is_equipos_and_config_loaded: boolean = false;

  constructor(
    private eventoDisciplinaService: EventoDisciplinaService
) {

}

ngOnInit(): void {

}

}
