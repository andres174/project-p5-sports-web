import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Evento } from "src/app/demo/api/evento.interface";
import { environment } from "src/environments/environment";
import { JugadorEquiposService } from "src/app/demo/service/jugador-equipos.service";
import { Equipo } from "src/app/demo/api/equipo.interface";
import { EventoDisciplinaFull } from "src/app/demo/api/evento-disciplina-full.interface";
import { EquipoDisciplina } from "src/app/demo/api/equipo-disciplina.interface";
import {
  JugadorEquipo,
  Posicion,
} from "src/app/demo/api/jugador-equipo.interface";
import { Table } from "primeng/table";
import { Jugador } from "src/app/demo/api/jugador.interface";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-jugador-equipos",
  templateUrl: "./jugador-equipos.component.html",
  styleUrls: ["./jugador-equipos.component.scss"],
  providers: [MessageService],
})
export class JugadorEquiposComponent implements OnInit {
  TECNICO_ID = 5;

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
  jugadorEquipo: JugadorEquipo = {};
  selectedJugadorEquipos: JugadorEquipo[] = [];

  tecnicos: JugadorEquipo[] = [];
  jugadores: JugadorEquipo[] = [];

  jugadorEquipoDialog: boolean = false;
  deleteJugadorEquipoDialog: boolean = false;
  deleteJugadorEquiposDialog: boolean = false;

  jugadorEquipoForm: FormGroup;

  jugadoresToAdd: Jugador[] = [];
  isJugadoresToAddLoading = false;

  posiciones: Posicion[] = [];
  isPosicionesLoading = false;

  loading = false;

  history: any = {};

  // history: any = {
  //   eventoId: 1,
  //   eventoDisciplinaId: 1,
  //   equipoDisciplinaId: 43,
  // };

  constructor(
    private jeService: JugadorEquiposService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.jugadorEquipoForm = formBuilder.group({
      jugador: new FormControl<Jugador | undefined>(undefined, [
        Validators.required,
      ]),
      posicion: new FormControl<Posicion | undefined>(undefined, [
        Validators.required,
      ]),
      numero: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

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
      },
      error: console.log,
      complete: () => {
        if (this.history?.eventoId) {
          this.selectedEvento = this.eventos.find(
            (ev) => ev.id == this.history.eventoId
          );
          this.getEventoDisciplinasByEvento(this.history.eventoId);
          this.history.eventoId = null;
        } else this.history = null;
      },
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
      },
      error: console.log,
      complete: () => {
        if (this.history?.eventoDisciplinaId) {
          this.selectedEventoDisciplina = this.eventoDisciplinas.find(
            (evd) => evd.id == this.history.eventoDisciplinaId
          );
          this.getEquipoDisciplinasByDisciplina(
            this.history.eventoDisciplinaId
          );
          this.history.eventoDisciplinaId = null;
        } else this.history = null;
      },
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
        },
        error: console.log,
        complete: () => {
          if (this.history?.equipoDisciplinaId) {
            this.selectedEquipoDisciplina = this.equipoDisciplinas.find(
              (eqd) => eqd.id == this.history.equipoDisciplinaId
            );
            this.getJugadorEquiposByEquipoDisciplina(
              this.history.equipoDisciplinaId
            );
            this.history.equipoDisciplinaId = null;
          } else this.history = null;
        },
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
            (jeq) => jeq.posicion?.id == this.TECNICO_ID
          );
          this.jugadores = this.jugadorEquipos.filter(
            (jeq) => jeq.posicion?.id != this.TECNICO_ID
          );
          this.loading = false;
        },
        error: console.log,
        complete: () => {
          this.refreshJugadoresToAddAndPosiciones();
        },
      });
  }

  getJugadoresToAddByDisciplina(idEventoDisciplina: number) {
    this.jugadoresToAdd = [];
    this.isJugadoresToAddLoading = true;
    this.jeService.getJugadoresToAddByDisciplina(idEventoDisciplina).subscribe({
      next: (res) => {
        this.jugadoresToAdd = res;
        this.isJugadoresToAddLoading = false;
      },
      error: console.log,
      complete: () => {
        // Si se esta editando, se agrega el jugador al array
        if (this.jugadorEquipo.id && this.jugadorEquipo.jugador) {
          this.jugadoresToAdd.unshift({ ...this.jugadorEquipo.jugador });
        }
      },
    });
  }

  getPosiciones() {
    this.posiciones = [];
    this.isPosicionesLoading = true;
    this.jeService.getPosiciones().subscribe({
      next: (res) => {
        this.posiciones = res;
        this.isPosicionesLoading = false;
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

  refreshJugadoresToAddAndPosiciones() {
    this.getJugadoresToAddByDisciplina(
      Number(this.selectedEventoDisciplina?.id)
    );
    this.getPosiciones();
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
    this.jugadorEquipos = [];
    this.tecnicos = [];
    this.jugadores = [];
    this.getJugadorEquiposByEquipoDisciplina(
      Number(this.selectedEquipoDisciplina?.id)
    );
  }

  onPosicionChange() {
    if (this.jugadorEquipoForm.value.posicion.id == this.TECNICO_ID) {
      this.jugadorEquipoForm.get("numero")?.disable();
      this.jugadorEquipoForm.get("numero")?.setValue(0);
    } else {
      this.jugadorEquipoForm.get("numero")?.enable();
    }
  }

  hideDialog() {
    this.jugadorEquipoDialog = false;
  }

  openNew() {
    this.jugadorEquipoDialog = true;
    this.jugadorEquipoForm.reset();
    this.jugadorEquipo = {};
    this.refreshJugadoresToAddAndPosiciones();
  }

  editJugadorEquipo(jugadorEquipo: JugadorEquipo) {
    this.jugadorEquipoDialog = true;
    this.jugadorEquipo = { ...jugadorEquipo };
    this.jugadorEquipoForm.patchValue({ ...jugadorEquipo });
    this.refreshJugadoresToAddAndPosiciones();
  }

  saveJugadorEquipo() {
    if (!this.jugadorEquipoForm.valid) {
      this.jugadorEquipoForm.markAllAsTouched();
      return;
    }
    // TODO: Vetifiar el limite de tecnicos?
    const data = {
      id_jugador: this.jugadorEquipoForm.value.jugador.id,
      id_equipo_disciplina: this.selectedEquipoDisciplina?.id,
      id_posicion: this.jugadorEquipoForm.value.posicion.id,
      numero: this.jugadorEquipoForm.value.numero ?? 0,
    };

    if (!this.jugadorEquipo.id) {
      this.storeJugadorEquipo(data);
    } else {
      this.updateJugadorEquipo(data);
    }

    this.hideDialog();
    this.jugadorEquipo = {};
  }

  storeJugadorEquipo(data: any) {
    this.jeService.storeJugadorEquipo(data).subscribe({
      next: (res) => {
        this.getJugadorEquiposByEquipoDisciplina(
          Number(this.selectedEquipoDisciplina?.id)
        );
        this.successMessage(res.message);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage(err.error.message);
      },
    });
  }

  updateJugadorEquipo(data: any) {
    this.jeService
      .updateJugadorEquipo(data, Number(this.jugadorEquipo.id))
      .subscribe({
        next: (res) => {
          this.getJugadorEquiposByEquipoDisciplina(
            Number(this.selectedEquipoDisciplina?.id)
          );
          this.successMessage(res.message);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage(err.error.message);
        },
      });
  }

  deleteJugadorEquipo(jugadorEquipo: JugadorEquipo) {
    this.deleteJugadorEquipoDialog = true;
    this.jugadorEquipo = { ...jugadorEquipo };
  }

  confirmDelete() {
    this.deleteJugadorEquipoDialog = false;
    this.loading = true;

    this.jeService
      .deleteJugadorEquipo(Number(this.jugadorEquipo.id))
      .subscribe({
        next: (res) => {
          this.getJugadorEquiposByEquipoDisciplina(
            Number(this.selectedEquipoDisciplina?.id)
          );
          this.successMessage(res.message);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage(err.error.message);
        },
      });

    this.jugadorEquipo = {};
  }

  deleteSelectedJugadorEquipos() {
    this.deleteJugadorEquiposDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteJugadorEquiposDialog = false;
    this.loading = true;
    this.jeService
      .deleteSelectedJugadorEquipos(
        this.selectedJugadorEquipos.map((jeq) => Number(jeq.id))
      )
      .subscribe({
        next: (res) => {
          this.getJugadorEquiposByEquipoDisciplina(
            Number(this.selectedEquipoDisciplina?.id)
          );
          this.successMessage(res.message);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage(err.error.message);
        },
      });

    this.selectedJugadorEquipos = [];
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
}
