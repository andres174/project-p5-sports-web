import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EquiposRoutingModule } from "./equipos-routing.module";

import { EquiposComponent } from "./equipos.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ImageModule } from "primeng/image";
import { FileUploadModule } from "primeng/fileupload";

@NgModule({
  declarations: [EquiposComponent],
  imports: [
    CommonModule,
    EquiposRoutingModule,
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
  ],
})
export class EquiposModule {}
