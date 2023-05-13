import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultadoService } from 'src/app/demo/service/resultado.service';
import { TablaPosicion } from './tabla-posicion';
import { MessageService } from 'primeng/api';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { GruposService } from 'src/app/demo/service/grupos-service/grupos.service';
@Component({
    selector: 'app-tabla-posicion',
    templateUrl: './tabla-posicion.component.html',
    styleUrls: ['./tabla-posicion.component.scss'],
    providers: [MessageService],
})
export class TablaPosicionComponent implements OnInit {
    Tablaposicion: TablaPosicion[] = [];
    posiciones: any
    cols: any[] = [];

    //logo equipo
    logo_equipo_url = environment.equipoUrl;

    // booleans
    is_equipos_and_config_loaded: boolean = false;

    //arrays & selecteds
    eventos: any[] = [];
    evento_selected: any;
    
    // para el disable
    is_evento_selected: boolean = true; 

   //arrays & selecteds
    disciplina: any[] = [];
    disciplina_selected: any;

   //arrays & selecteds
    grupo: any[] = [];
    grupo_selected: any;


    tablaPosicion: TablaPosicion[] = [];
    //ngStyle 
    //margen
    margen = {
        'margin-bottom.em': '2'
    }

    constructor(
        private grupoService: GruposService,
        private ResultadoService: ResultadoService,
        private messageService: MessageService,
    ) {
        /*  this.url = environment.url; */
    }
    ngOnInit(): void {
        this.getEventos();
        this.getEquiposGrupos();
    }



    getEventos() {
        this.grupoService.getEventos().subscribe({
            next: (value) => {
                this.eventos = value;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }


    getOneEventoDisciplina() {
        this.grupoService.getOneEventoDisciplina(this.evento_selected.id).subscribe({
            next: (value) => {
                this.disciplina = value;
            },
            error: (err) => {
                console.log(err);
            }
        });
        this.is_evento_selected = false;
    }

    getEquiposAndConfigFromDisciplina() {
        this.grupoService.getEquiposFromOneDisciplina(this.disciplina_selected.id_evento_disciplina).subscribe({
            next: (value) => {
                this.grupo = value;
            },
            error: (err) => {
                console.log(err);
            }
        });
        this.is_equipos_and_config_loaded = true;

    }


    getEquiposGrupos() {
      
        this.ResultadoService.gettablaGrupos(this.grupo_selected.id).subscribe({
            next: (value) => {
                this.grupo = value;
            },
            error: (err) => {
                console.log(err);
            }
        });
        this.is_evento_selected = false;

    }

}





