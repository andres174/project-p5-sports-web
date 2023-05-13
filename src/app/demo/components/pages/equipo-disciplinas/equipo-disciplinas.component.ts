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
  idOrganizador = 1;

  selectedEvento?: Evento;
  selectedEventoDisciplina?: EventoDisciplinaFull;

  equipoDisciplinas: EquipoDisciplina[] = [];
  equipoDisciplina: EquipoDisciplina = {};
  selectedEquipoDisciplinas: EquipoDisciplina[] = [];
  isEquipoDisciplinasLoading = false;

  deleteEquipoDisciplinaDialog = false;
  deleteEquipoDisciplinasDialog = false;

  equiposToAdd: Equipo[] = [];
  equipoToAdd?: Equipo;
  isEquiposToAddLoading = false;

  maxNumberEquipos = 0;

  loading = false;

  history: any = {};

  // history: any = {
  //   eventoId: 1,
  //   eventoDisciplinaId: 1,
  // };

  //TODO: hacer form
  constructor(
    private edService: EquipoDisciplinasService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    // TODO: utilizar la id del que navega
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

  onEventoChange(evento: Evento) {
    this.selectedEvento = { ...evento };

    this.equipoDisciplinas = [];
    this.equipoToAdd = undefined;
  }

  onEventoDisciplinaChange(eventoDisciplina: EventoDisciplinaFull) {
    this.selectedEventoDisciplina = { ...eventoDisciplina };

    this.maxNumberEquipos =
      Number(eventoDisciplina.configuracion?.numero_miembros) *
      Number(eventoDisciplina.configuracion?.numero_grupos);

    this.equipoDisciplinas = [];
    this.equipoToAdd = undefined;

    this.refreshEquipos();
  }

  getEquipoDisciplinasByDisciplina(idEventoDisciplina: number) {
    this.isEquipoDisciplinasLoading = true;
    this.loading = true;
    this.edService
      .getEquipoDisciplinasByDisciplina(idEventoDisciplina)
      .subscribe({
        next: (res: EquipoDisciplina[]) => {
          this.equipoDisciplinas = res.map((eqd) => {
            if (eqd.equipo)
              eqd.equipo.logo &&= `${environment.equipoUrl}${eqd.equipo?.id}/${eqd.equipo?.logo}`;
            return eqd;
          });
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
      next: (res: Equipo[]) => {
        this.equiposToAdd = res.map((eq) => {
          eq.logo &&= `${environment.equipoUrl}${eq.id}/${eq.logo}`;
          return eq;
        });
        this.isEquiposToAddLoading = false;
        this.loading = false;
      },
      error: console.log,
    });
  }

  refreshEquipos() {
    this.getEquipoDisciplinasByDisciplina(
      Number(this.selectedEventoDisciplina?.id)
    );
    this.getEquiposToAddByDisciplina(Number(this.selectedEventoDisciplina?.id));
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
