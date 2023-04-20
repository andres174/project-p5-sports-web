import { EquiposJugadoresService } from "src/app/demo/service/equipos-jugadores.service";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Evento } from "src/app/demo/api/evento.interface";
import { Configuracion } from "src/app/demo/api/configuracion.interface";
import { EventoDisciplinaSmall } from "src/app/demo/api/evento-disciplina-small.interface";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-equipos-jugadores",
  templateUrl: "./equipos-jugadores.component.html",
  styleUrls: ["./equipos-jugadores.component.scss"],
  providers: [MessageService],
})
export class EquiposJugadoresComponent implements OnInit {
  eventos: Evento[] = [];
  selectedEvento?: Evento;
  isEventosLoading: boolean = true;

  eventoDisciplinasSmall: EventoDisciplinaSmall[] = [];
  selectedEventoDisciplina?: EventoDisciplinaSmall;
  isEventoDisciplinasLoading: boolean = true;

  selectedConfiguracion?: Configuracion;
  isConfiguracionLoading: boolean = false;

  loading: boolean = false;

  constructor(private ejService: EquiposJugadoresService) {}

  ngOnInit(): void {
    // TODO: utilizar la id del que navega
    this.getEventosFromOrganizador(1);
  }

  getEventosFromOrganizador(idOrganizador: number) {
    this.ejService.getEventosFromOrganizador(idOrganizador).subscribe({
      next: (value) => {
        this.eventos = value;
        this.isEventosLoading = false;
      },
      error: console.log,
    });
  }

  getEventoDisciplinasSmallFromEvento(idEvento: number) {
    this.ejService.getEventoDisciplinasSmallFromEvento(idEvento).subscribe({
      next: (value) => {
        this.eventoDisciplinasSmall = value;
        this.isEventoDisciplinasLoading = false;
      },
      error: console.log,
    });
  }

  getConfiguracion(id: number) {
    this.ejService.getConfiguracion(id).subscribe({
      next: (value) => {
        this.selectedConfiguracion = value;
        this.isConfiguracionLoading = false;
      },
      error: console.log,
    });
  }

  getEventoImg(evento: Evento) {
    if (evento.imagen)
      return `${environment.EventUrl}${evento.id}/${evento.imagen}`;
    else return "";
  }

  onEventoChange() {
    this.eventoDisciplinasSmall = [];
    this.isEventoDisciplinasLoading = true;
    this.selectedConfiguracion = undefined;

    this.getEventoDisciplinasSmallFromEvento(Number(this.selectedEvento?.id));
  }

  onEventoDisciplinaChange() {
    //TODO: Conseguir equipos

    if (
      this.selectedEventoDisciplina?.id_configuracion !==
      this.selectedConfiguracion?.id
    ) {
      this.selectedConfiguracion = undefined;
      this.isConfiguracionLoading = true;
      this.getConfiguracion(
        Number(this.selectedEventoDisciplina?.id_configuracion)
      );
    }
  }
}
