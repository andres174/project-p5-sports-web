import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { UsuariosComponent } from "./usuarios.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";
import { ImageModule } from "primeng/image";

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    FileUploadModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    PasswordModule,
    ImageModule,
  ],
})
export class UsuariosModule {}
