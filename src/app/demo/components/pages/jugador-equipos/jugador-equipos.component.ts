import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Evento } from "src/app/demo/api/evento.interface";
import { Configuracion } from "src/app/demo/api/configuracion.interface";
import { EventoDisciplina } from "src/app/demo/api/evento-disciplina.interface";
import { environment } from "src/environments/environment";
import { JugadorEquiposService } from "src/app/demo/service/jugador-equipos.service";
import { Equipo } from "src/app/demo/api/equipo.interface";

@Component({
  selector: "app-jugador-equipos",
  templateUrl: "./jugador-equipos.component.html",
  styleUrls: ["./jugador-equipos.component.scss"],
  providers: [MessageService],
})
export class JugadorEquiposComponent implements OnInit {
  eventos: Evento[] = [];
  selectedEvento?: Evento;
  isEventosLoading: boolean = true;

  eventoDisciplinas: EventoDisciplina[] = [];
  selectedEventoDisciplina?: EventoDisciplina;
  isEventoDisciplinasLoading: boolean = false;

  selectedConfiguracion?: Configuracion;
  isConfiguracionLoading: boolean = false;

  equipos: Equipo[] = [];
  selectedEquipo?: Equipo;
  isEquiposLoading: boolean = false;

  constructor(private jeService: JugadorEquiposService) {}

  ngOnInit(): void {
    // TODO: utilizar la id del que navega
    this.getEventosByOrganizador(1);
  }

  getEventosByOrganizador(idOrganizador: number) {
    this.eventos = [];
    this.isEventosLoading = true;
    this.jeService.getEventosByOrganizador(idOrganizador).subscribe({
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
    this.jeService.getEventoDisciplinasByEvento(idEvento).subscribe({
      next: (value) => {
        this.eventoDisciplinas = value;
        this.isEventoDisciplinasLoading = false;
      },
      error: console.log,
    });
  }

  getConfiguracion(id: number) {
    this.selectedConfiguracion = undefined;
    this.isConfiguracionLoading = true;
    this.jeService.getConfiguracion(id).subscribe({
      next: (value) => {
        this.selectedConfiguracion = value;
        this.isConfiguracionLoading = false;
      },
      error: console.log,
    });
  }

  getEquiposByDisciplina(id_evento_disciplina: number) {
    this.equipos = [];
    this.selectedEquipo = undefined;
    this.isEquiposLoading = true;
    this.jeService.getEquiposByDisciplina(id_evento_disciplina).subscribe({
      next: (value) => {
        this.equipos = value;
        this.isEquiposLoading = false;
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
    this.selectedConfiguracion = undefined;

    this.equipos = [];
    this.selectedEquipo = undefined;

    this.getEventoDisciplinasByEvento(Number(this.selectedEvento?.id));
  }

  onEventoDisciplinaChange() {
    this.getEquiposByDisciplina(Number(this.selectedEventoDisciplina?.id));

    if (
      this.selectedEventoDisciplina?.id_configuracion !==
      this.selectedConfiguracion?.id
    ) {
      this.getConfiguracion(
        Number(this.selectedEventoDisciplina?.id_configuracion)
      );
    }
  }

  onEquipoChange() {}
}
