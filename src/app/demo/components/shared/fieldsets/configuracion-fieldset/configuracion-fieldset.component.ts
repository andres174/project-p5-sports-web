import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { EventoDisciplinaFull } from "src/app/demo/api/evento-disciplina-full.interface";

@Component({
  selector: "app-configuracion-fieldset",
  templateUrl: "./configuracion-fieldset.component.html",
  styleUrls: ["./configuracion-fieldset.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracionFieldsetComponent {
  @Input() eventoDisciplina?: EventoDisciplinaFull;
}
