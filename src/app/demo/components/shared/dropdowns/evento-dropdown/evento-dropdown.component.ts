import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { Evento } from "src/app/demo/api/evento.interface";
import { EquipoDisciplinasService } from "src/app/demo/service/equipo-disciplinas.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-evento-dropdown",
  templateUrl: "./evento-dropdown.component.html",
  styleUrls: ["./evento-dropdown.component.scss"],
})
export class EventoDropdownComponent implements OnChanges {
  @Input() floatLabel: boolean = true;
  @Input() inputId: string = "";

  @Input() idOrganizador?: number;

  @Output() onChange = new EventEmitter<Evento>();

  eventos: Evento[] = [];
  selectedEvento?: Evento = undefined;

  isLoading = false;

  constructor(private evService: EquipoDisciplinasService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.idOrganizador) return;

    this.isLoading = true;
    this.eventos = [];
    this.selectedEvento = undefined;

    this.evService
      .getEventosByOrganizador(Number(this.idOrganizador))
      .subscribe({
        next: (res: Evento[]) => {
          this.eventos = res.map((ev) => {
            ev.imagen &&= `${environment.EventUrl}${ev.id}/${ev.imagen}`;
            return ev;
          });
          this.isLoading = false;
        },
      });
  }

  onEventoChange(evento: Evento) {
    this.onChange.emit(evento);
  }
}
