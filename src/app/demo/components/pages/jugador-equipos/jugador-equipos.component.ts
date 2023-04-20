import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Evento } from "src/app/demo/api/evento.interface";
import { Configuracion } from "src/app/demo/api/configuracion.interface";
import { EventoDisciplinaSmall } from "src/app/demo/api/evento-disciplina-small.interface";
import { environment } from "src/environments/environment";
import { JugadorEquiposService } from "src/app/demo/service/jugador-equipos.service";

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

  eventoDisciplinasSmall: EventoDisciplinaSmall[] = [];
  selectedEventoDisciplina?: EventoDisciplinaSmall;
  isEventoDisciplinasLoading: boolean = true;

  selectedConfiguracion?: Configuracion;
  isConfiguracionLoading: boolean = false;

  loading: boolean = false;

  constructor(private jeService: JugadorEquiposService) {}

  ngOnInit(): void {
    // TODO: utilizar la id del que navega
    this.getEventosFromOrganizador(1);
  }

  getEventosFromOrganizador(idOrganizador: number) {
    this.jeService.getEventosFromOrganizador(idOrganizador).subscribe({
      next: (value) => {
        this.eventos = value;
        this.isEventosLoading = false;
      },
      error: console.log,
    });
  }

  getEventoDisciplinasSmallFromEvento(idEvento: number) {
    this.jeService.getEventoDisciplinasSmallFromEvento(idEvento).subscribe({
      next: (value) => {
        this.eventoDisciplinasSmall = value;
        this.isEventoDisciplinasLoading = false;
      },
      error: console.log,
    });
  }

  getConfiguracion(id: number) {
    this.jeService.getConfiguracion(id).subscribe({
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
