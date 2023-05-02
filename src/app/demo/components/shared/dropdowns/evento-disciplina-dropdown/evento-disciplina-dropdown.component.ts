import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { EventoDisciplinaFull } from "src/app/demo/api/evento-disciplina-full.interface";
import { EquipoDisciplinasService } from "src/app/demo/service/equipo-disciplinas.service";

@Component({
  selector: "app-evento-disciplina-dropdown",
  templateUrl: "./evento-disciplina-dropdown.component.html",
  styleUrls: ["./evento-disciplina-dropdown.component.scss"],
})
export class EventoDisciplinaDropdownComponent implements OnChanges {
  @Input() floatLabel: boolean = true;
  @Input() inputId: string = "";

  @Input() idEvento?: number;

  @Output() onChange = new EventEmitter<EventoDisciplinaFull>();

  eventoDisciplinas: EventoDisciplinaFull[] = [];
  selectedEventoDisciplina?: EventoDisciplinaFull;

  isLoading = false;

  constructor(private evdService: EquipoDisciplinasService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.idEvento) return;

    this.isLoading = true;
    this.eventoDisciplinas = [];
    this.selectedEventoDisciplina = undefined;

    this.evdService
      .getEventoDisciplinasFullByEvento(Number(this.idEvento))
      .subscribe({
        next: (res) => {
          this.eventoDisciplinas = res;
          this.isLoading = false;
        },
      });
  }

  onEventoDisciplinaChange(eventoDisciplina: EventoDisciplinaFull) {
    this.onChange.emit(eventoDisciplina);
  }
}
