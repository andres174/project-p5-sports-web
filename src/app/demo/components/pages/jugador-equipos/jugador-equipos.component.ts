import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Evento } from "src/app/demo/api/evento.interface";
import { Configuracion } from "src/app/demo/api/configuracion.interface";
import { environment } from "src/environments/environment";
import { JugadorEquiposService } from "src/app/demo/service/jugador-equipos.service";
import { Equipo } from "src/app/demo/api/equipo.interface";
import { EventoDisciplinaFull } from "src/app/demo/api/evento-disciplina-full.interface";
import { EquipoDisciplina } from "src/app/demo/api/equipo-disciplina.interface";
import { JugadorEquipo } from "src/app/demo/api/jugador-equipo.interface";
import { Table } from "primeng/table";
import { Jugador } from "src/app/demo/api/jugador.interface";

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

  eventoDisciplinas: EventoDisciplinaFull[] = [];
  selectedEventoDisciplina?: EventoDisciplinaFull;
  isEventoDisciplinasLoading: boolean = false;

  equipoDisciplinas: EquipoDisciplina[] = [];
  selectedEquipoDisciplina?: EquipoDisciplina;
  isEquipoDisciplinasLoading = false;

  jugadorEquipos: JugadorEquipo[] = [];
  selectedJugadorEquipos: JugadorEquipo[] = [];

  tecnicos: JugadorEquipo[] = [];
  tecnico?: JugadorEquipo;

  jugadores: JugadorEquipo[] = [];
  jugador: JugadorEquipo = {};

  loading = false;

  // history: any = {
  //   eventoId: 1,
  //   eventoDisciplinaId: 1,
  //   equipoDisciplinaId: 43,
  // };

  history: any = {};

  constructor(
    private jeService: JugadorEquiposService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // TODO: utilizar la id del que navega
    this.getEventosByOrganizador(1);
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

  getEventosByOrganizador(idOrganizador: number) {
    this.eventos = [];
    this.isEventosLoading = true;
    this.jeService.getEventosByOrganizador(idOrganizador).subscribe({
      next: (res) => {
        this.eventos = res;
        this.isEventosLoading = false;
        if (this.history.eventoId) {
          this.selectedEvento = this.eventos.find(
            (ev) => ev.id == this.history.eventoId
          );
          this.getEventoDisciplinasByEvento(this.history.eventoId);
          this.history.eventoId = null;
        }
      },
      error: console.log,
    });
  }

  getEventoDisciplinasByEvento(idEvento: number) {
    this.eventoDisciplinas = [];
    this.selectedEventoDisciplina = undefined;
    this.isEventoDisciplinasLoading = true;
    this.jeService.getEventoDisciplinasFullByEvento(idEvento).subscribe({
      next: (res) => {
        this.eventoDisciplinas = res;
        this.isEventoDisciplinasLoading = false;
        if (this.history.eventoDisciplinaId) {
          this.selectedEventoDisciplina = this.eventoDisciplinas.find(
            (evd) => evd.id == this.history.eventoDisciplinaId
          );
          this.getEquipoDisciplinasByDisciplina(
            this.history.eventoDisciplinaId
          );
          this.history.eventoDisciplinaId = null;
        }
      },
      error: console.log,
    });
  }

  getEquipoDisciplinasByDisciplina(idEventoDisciplina: number) {
    this.equipoDisciplinas = [];
    this.selectedEquipoDisciplina = undefined;
    this.isEquipoDisciplinasLoading = true;
    this.jeService
      .getEquipoDisciplinasByDisciplina(idEventoDisciplina)
      .subscribe({
        next: (res) => {
          this.equipoDisciplinas = res;
          this.isEquipoDisciplinasLoading = false;
          if (this.history.equipoDisciplinaId) {
            this.selectedEquipoDisciplina = this.equipoDisciplinas.find(
              (eqd) => eqd.id == this.history.equipoDisciplinaId
            );
            this.getJugadorEquiposByEquipoDisciplina(
              this.history.equipoDisciplinaId
            );
            this.history.equipoDisciplinaId = null;
          }
        },
        error: console.log,
      });
  }

  getJugadorEquiposByEquipoDisciplina(idEquipoDisciplina: number) {
    this.jugadorEquipos = [];
    this.loading = true;
    this.jeService
      .getJugadorEquiposByEquipoDisciplina(Number(idEquipoDisciplina))
      .subscribe({
        next: (res) => {
          this.jugadorEquipos = res;

          this.tecnicos = this.jugadorEquipos.filter(
            (jeq) => jeq.posicion?.id == 5
          );
          this.jugadores = this.jugadorEquipos.filter(
            (jeq) => jeq.posicion?.id != 5
          );
          this.loading = false;
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

  getJugadorImg(jugador: Jugador) {
    if (jugador.foto)
      return `${environment.jugUrl}${jugador.id}/${jugador.foto}`;
    else return "";
  }

  onEventoChange() {
    this.equipoDisciplinas = [];
    this.jugadorEquipos = [];
    this.tecnicos = [];
    this.jugadores = [];

    this.getEventoDisciplinasByEvento(Number(this.selectedEvento?.id));
  }

  onEventoDisciplinaChange() {
    this.jugadorEquipos = [];
    this.tecnicos = [];
    this.jugadores = [];
    this.getEquipoDisciplinasByDisciplina(
      Number(this.selectedEventoDisciplina?.id)
    );
  }

  onEquipoDisciplinaChange() {
    this.getJugadorEquiposByEquipoDisciplina(
      Number(this.selectedEquipoDisciplina?.id)
    );
  }

  openNew() {}

  editJugadorEquipo(jugadorEquipo: JugadorEquipo) {}

  deleteJugadorEquipo(jugadorEquipo: JugadorEquipo) {}

  deleteSelectedJugadorEquipos() {
    console.log(this.selectedEvento);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
}
