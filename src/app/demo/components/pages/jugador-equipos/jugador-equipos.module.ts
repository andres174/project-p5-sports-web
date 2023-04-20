import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { JugadorEquiposRoutingModule } from "./jugador-equipos-routing.module";
import { JugadorEquiposComponent } from "./jugador-equipos.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { ImageModule } from "primeng/image";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
  declarations: [JugadorEquiposComponent],
  imports: [
    CommonModule,
    JugadorEquiposRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    ImageModule,
    TabViewModule,
    DropdownModule,
    FieldsetModule,
  ],
})
export class JugadorEquiposModule {}
