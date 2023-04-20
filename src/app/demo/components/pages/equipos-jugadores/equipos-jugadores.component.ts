import { EquiposJugadoresService } from "src/app/demo/service/equipos-jugadores.service";
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Evento } from "src/app/demo/api/evento.interface";
import { Disciplina } from "src/app/demo/api/disciplina.interface";
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
  isEventoLoading: boolean = true;

  eventoDisciplinasSmall: EventoDisciplinaSmall[] = [];
  selectedEventoDisciplina?: EventoDisciplinaSmall;
  isEventoDisciplinaLoading: boolean = true;

  loading: boolean = false;

  events: Evento[] = [];

  disciplinas: Disciplina[] = [
    { id: 1, nombre: "Futbol" },
    { id: 2, nombre: "Basket" },
  ];

  selectedDisciplina?: Disciplina;

  disciplinasConfiguraciones: {
    disciplina?: Disciplina;
    configuracion?: Configuracion;
  }[] = [
    {
      disciplina: { id: 1, nombre: "Futbol" },
      configuracion: { nombre: "Futbol extremo" },
    },
    {
      disciplina: { id: 1, nombre: "Futbol" },
      configuracion: { nombre: "Futbol para debiles" },
    },
    {
      disciplina: { id: 2, nombre: "Basquet" },
      configuracion: { nombre: "Basquet extremo" },
    },
  ];

  selectedDisciplinaConfiguracion?: {
    disciplina?: Disciplina;
    configuracion?: Configuracion;
  };

  eventoDisciplinas: any = [];
  eventoDisciplinasTotal = [
    {
      id: 1,
      disciplina: "futbol",
      configuracion: "futbol normal",
      id_evento: 1,
      equipos: [
        { id: 22, nombre: "UTM" },
        { id: 43, nombre: "Omega" },
      ],
    },
    {
      id: 3,
      disciplina: "futbol",
      configuracion: "futbol normal",
      id_evento: 2,
      equipos: [
        { id: 22, nombre: "UTM" },
        { id: 43, nombre: "Omega" },
      ],
    },
    {
      id: 12,
      disciplina: "Basquet",
      configuracion: "Basquet extremo",
      id_evento: 1,
    },
  ];

  constructor(private ejService: EquiposJugadoresService) {}

  getEventoDisciplina(eventId: number) {
    this.eventoDisciplinas = this.eventoDisciplinasTotal.filter(
      (ed) => ed.id_evento === eventId
    );
  }

  ngOnInit(): void {
    // TODO: utilizar la id del que navega
    this.getEventosFromOrganizador(1);
    // console.log(history);
  }

  getEventosFromOrganizador(idOrganizador: number) {
    this.ejService.getEventosFromOrganizador(idOrganizador).subscribe({
      next: (value) => {
        this.eventos = value;
        this.isEventoLoading = false;
        // console.log(value);
      },
      error: console.log,
    });
  }

  getEventoDisciplinasSmallFromEvento(idEvento: number) {
    this.eventoDisciplinasSmall = [];
    this.isEventoDisciplinaLoading = true;
    this.ejService.getEventoDisciplinasSmallFromEvento(idEvento).subscribe({
      next: (value) => {
        this.eventoDisciplinasSmall = value;
        this.isEventoDisciplinaLoading = false;
      },
      error: console.log,
    });
  }

  getEventoImg(evento: Evento) {
    if (evento.imagen)
      return `${environment.EventUrl}${evento.id}/${evento.imagen}`;
    else return "";
  }
}
