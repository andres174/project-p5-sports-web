import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/demo/service/grupos-service/grupos.service';
import { environment } from 'src/environments/environment';



@Component({
    selector: 'app-grupos',
    templateUrl: './grupos.component.html',
    styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

    //logo equipo
    logo_equipo_url = environment.equipoUrl;

    // booleans
    is_generar_grupos_clicked: boolean = false;
    is_equipos_and_config_loaded: boolean = false;

    //arrays & selecteds
    eventos: any[] = [];
    evento_selected: any;
    is_evento_selected: boolean = true; // para el disable

    evento_disciplina: any[] = [];
    evento_disciplina_selected: any;

    equipos_disciplina: any[] = [];
    array_equipos_disciplina: any[] = [];

    configuracion_disciplina: any[] = [];

    //ngStyle 
    //margen
    margen = {
        'margin-bottom.em': '2'
    }
    

    constructor(
        private grupoService: GruposService
    ) {

    }

    ngOnInit(): void {

    }

    generarGruposBool() {
        this.getEventos();
        this.is_generar_grupos_clicked = true;

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
                this.evento_disciplina = value;
            },
            error: (err) => {
                console.log(err);
            }
        });
        this.is_evento_selected = false;
    }

    getEquiposAndConfigFromDisciplina() {
        console.log(this.evento_disciplina_selected.id_evento_disciplina);

        this.grupoService.getEquiposFromOneDisciplina(this.evento_disciplina_selected.id_evento_disciplina).subscribe({
            next: (value) => {
                /* console.log(value); */
                this.equipos_disciplina = value;
                console.log(this.equipos_disciplina);
            },
            error: (err) => {
                console.log(err);
            }
        });

        this.grupoService.getConfiguracionFromEventoDisciplina(this.evento_disciplina_selected.id_evento_disciplina).subscribe({
            next: (value) => {
                /* console.log(value); */
                this.configuracion_disciplina = value;
                console.log(this.configuracion_disciplina);
            },
            error: (err) => {
                console.log(err);

            }
        });

        this.is_equipos_and_config_loaded = true;
        
    }

    generarGrupos(){
        let id_evento_disciplina = this.evento_disciplina_selected.id_evento_disciplina;
        let equipos:string = '';

        this.equipos_disciplina.forEach(e => {
            if(equipos == ''){
                equipos = e.id_equipo
            } else {
                equipos = equipos + ',' + e.id_equipo;
            }
        });

        //es gracioso que esto funcione

        console.log(equipos, "id" + id_evento_disciplina);

        let data = {
            id_evento_disciplina: id_evento_disciplina,
            equipos: equipos
        }

        this.grupoService.generarGrupos(data).subscribe({
            next: (value) => {
                console.log(value);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    impAlert() {
        console.log(this.evento_selected);
    }



}
