import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";

import { EquiposJugadoresRoutingModule } from "./equipos-jugadores-routing.module";
import { EquiposJugadoresComponent } from "./equipos-jugadores.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { FileUploadModule } from "primeng/fileupload";
import { ImageModule } from "primeng/image";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { TabViewModule } from "primeng/tabview";

import { LOCALE_ID } from "@angular/core";
import localeEsEC from "@angular/common/locales/es-EC";
import { DropdownModule } from "primeng/dropdown";
registerLocaleData(localeEsEC, "es-EC");

@NgModule({
  declarations: [EquiposJugadoresComponent],
  imports: [
    CommonModule,
    EquiposJugadoresRoutingModule,
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
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es-EC" }],
})
export class EquiposJugadoresModule {}
