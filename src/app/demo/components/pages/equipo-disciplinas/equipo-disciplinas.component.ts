import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { EquipoDisciplina } from "src/app/demo/api/equipo-disciplina.interface";
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
  isEventosLoading = true;

  eventoDisciplinas: EventoDisciplinaFull[] = [];
  selectedEventoDisciplina?: EventoDisciplinaFull;
  isEventoDisciplinasLoading = false;

  equipoDisciplinas: EquipoDisciplina[] = [];
  equipoDisciplina: EquipoDisciplina = {};
  selectedEquipoDisciplinas: EquipoDisciplina[] = [];
  isEquipoDisciplinasLoading = false;

  deleteEquipoDisciplinaDialog = false;
  deleteEquipoDisciplinasDialog = false;

  equiposToAdd: Equipo[] = [];
  equipoToAdd?: Equipo;
  isEquiposToAddLoading = false;

  loading = false;

  history: any = {};

  // history: any = {
  //   eventoId: 1,
  //   eventoDisciplinaId: 1,
  // };

  constructor(
    private edService: EquipoDisciplinasService,
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
    this.edService.getEventosByOrganizador(idOrganizador).subscribe({
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
    this.edService.getEventoDisciplinasFullByEvento(idEvento).subscribe({
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
    this.isEquipoDisciplinasLoading = true;
    this.loading = true;
    this.edService
      .getEquipoDisciplinasByDisciplina(idEventoDisciplina)
      .subscribe({
        next: (res) => {
          this.equipoDisciplinas = res;
          this.isEquipoDisciplinasLoading = false;
          this.loading = false;
        },
        error: console.log,
      });
  }

  getEquiposToAddByDisciplina(idEventoDisciplina: number) {
    this.equiposToAdd = [];
    this.equipoToAdd = undefined;
    this.isEquiposToAddLoading = true;

    this.edService.getEquiposToAddByDisciplina(idEventoDisciplina).subscribe({
      next: (values) => {
        this.equiposToAdd = values;
        this.isEquiposToAddLoading = false;
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

  getMaxNumberEquipos() {
    return (
      Number(this.selectedEventoDisciplina?.configuracion?.numero_miembros) *
      Number(this.selectedEventoDisciplina?.configuracion?.numero_grupos)
    );
  }

  refreshEquipos() {
    this.getEquipoDisciplinasByDisciplina(
      Number(this.selectedEventoDisciplina?.id)
    );
    this.getEquiposToAddByDisciplina(Number(this.selectedEventoDisciplina?.id));
  }

  onEventoChange() {
    this.equipoDisciplinas = [];
    this.equipoToAdd = undefined;

    this.getEventoDisciplinasByEvento(Number(this.selectedEvento?.id));
  }

  onEventoDisciplinaChange() {
    this.equipoDisciplinas = [];
    this.equipoToAdd = undefined;
    this.refreshEquipos();
  }

  storeEquipoDisciplina() {
    if (!this.selectedEventoDisciplina && !this.equipoToAdd) return;

    this.loading = true;

    const data = {
      id_equipo: this.equipoToAdd?.id,
      id_evento_disciplina: this.selectedEventoDisciplina?.id,
    };

    this.edService.storeEquipoDisciplina(data).subscribe({
      next: (res) => {
        this.refreshEquipos();
        this.successMessage(res.message);
      },
      error: console.log,
    });
  }

  deleteEquipoDisciplina(equipoDisciplina: EquipoDisciplina) {
    this.deleteEquipoDisciplinaDialog = true;
    this.equipoDisciplina = { ...equipoDisciplina };
  }

  confirmDelete() {
    this.deleteEquipoDisciplinaDialog = false;
    this.loading = true;

    this.edService
      .deleteEquipoDisciplina(Number(this.equipoDisciplina.id))
      .subscribe({
        next: (res) => {
          this.refreshEquipos();
          this.successMessage(res.message);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage(err.error.message);
          this.loading = false;
        },
      });

    this.equipoDisciplina = {};
  }

  deleteSelectedEquipoDisciplinas() {
    this.deleteEquipoDisciplinasDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteEquipoDisciplinasDialog = false;
    this.loading = true;

    this.edService
      .deleteSelectedEquipoDisciplina(
        this.selectedEquipoDisciplinas.map((eqd) => Number(eqd.id))
      )
      .subscribe({
        next: (res) => {
          this.refreshEquipos();
          this.successMessage(res.message);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage(err.error.message);
          this.loading = false;
        },
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
}
