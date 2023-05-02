import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EquipoDisciplinasRoutingModule } from "./equipo-disciplinas-routing.module";
import { EquipoDisciplinasComponent } from "./equipo-disciplinas.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { InputNumberModule } from "primeng/inputnumber";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ImageModule } from "primeng/image";
import { EventoDropdownModule } from "@shared/dropdowns/evento-dropdown/evento-dropdown.module";
import { EventoDisciplinaDropdownModule } from "@shared/dropdowns/evento-disciplina-dropdown/evento-disciplina-dropdown.module";

@NgModule({
  declarations: [EquipoDisciplinasComponent],
  imports: [
    CommonModule,
    EquipoDisciplinasRoutingModule,
    EventoDropdownModule,
    EventoDisciplinaDropdownModule,
    InputTextModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputSwitchModule,
    CardModule,
    FieldsetModule,
    ImageModule,
  ],
})
export class EquipoDisciplinasModule {}
