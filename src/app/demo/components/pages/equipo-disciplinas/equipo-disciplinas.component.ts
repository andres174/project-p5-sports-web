import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Equipo } from "src/app/demo/api/equipo.interface";
import { EventoDisciplinaFull } from "src/app/demo/api/evento-disciplina-full.interface";
import { Evento } from "src/app/demo/api/evento.interface";
import { EquipoDisciplinasService } from "src/app/demo/service/equipo-disciplinas.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-equipo-disciplinas",
  templateUrl: "./equipo-disciplinas.component.html",
  styleUrls: ["./equipo-disciplinas.component.scss"],
  providers: [MessageService],
})
export class EquipoDisciplinasComponent implements OnInit {
  eventos: Evento[] = [];
  selectedEvento?: Evento;
  isEventosLoading: boolean = true;

  eventoDisciplinas: EventoDisciplinaFull[] = [];
  selectedEventoDisciplina?: EventoDisciplinaFull;
  isEventoDisciplinasLoading: boolean = false;

  equipos: Equipo[] = [];
  equiposToAdd: Equipo[] = [];
  equipoToAdd?: Equipo;

  constructor(private edService: EquipoDisciplinasService) {}
  ngOnInit(): void {
    // TODO: utilizar la id del que navega
    this.getEventosByOrganizador(1);
  }

  getEventosByOrganizador(idOrganizador: number) {
    this.eventos = [];
    this.isEventosLoading = true;
    this.edService.getEventosByOrganizador(idOrganizador).subscribe({
      next: (value) => {
        this.eventos = value;
        this.isEventosLoading = false;
      },
      error: console.log,
    });
  }

  getEventoDisciplinasByEvento(idEvento: number) {
    this.eventoDisciplinas = [];
    this.selectedEventoDisciplina = undefined;
    this.isEventoDisciplinasLoading = true;
    this.edService.getEventoDisciplinasFullByEvento(idEvento).subscribe({
      next: (value) => {
        this.eventoDisciplinas = value;
        this.isEventoDisciplinasLoading = false;
      },
      error: console.log,
    });
  }

  getEventoImg(evento: Evento) {
    if (evento.imagen)
      return `${environment.EventUrl}${evento.id}/${evento.imagen}`;
    else return "";
  }

  getEquipoLogo(equipo: Equipo) {
    if (equipo.logo)
      return `${environment.equipoUrl}${equipo.id}/${equipo.logo}`;
    else return "";
  }

  onEventoChange() {
    this.equipos = [];
    this.equipoToAdd = undefined;

    this.getEventoDisciplinasByEvento(Number(this.selectedEvento?.id));
  }

  onEventoDisciplinaChange() {}
}
