import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/demo/service/grupos-service/grupos.service';


@Component({
    selector: 'app-grupos',
    templateUrl: './grupos.component.html'
})
export class GruposComponent implements OnInit {

    isLoadTable: boolean = false;

    eventos: any[] = [];
    evento_selected: any;

    evento_disciplina: any[] = [];
    evento_disciplina_selected: any;

    equipos_disciplina: any[] = [];
    array_equipos_disciplina: any[] = [];

    constructor(
        private grupoService: GruposService
    ) {

    }

    ngOnInit(): void {

    }

    generarGruposBool() {
        this.getEventos();

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
    }

    getEquiposFromDisciplina() {
        console.log(this.evento_disciplina_selected.id_evento_disciplina);

        this.grupoService.getEquiposFromOneDisciplina(this.evento_disciplina_selected.id_evento_disciplina).subscribe({
            next: (value) => {
                console.log(value);
                this.equipos_disciplina = value;
                console.log(this.equipos_disciplina);
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
