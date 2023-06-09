import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JugadoresRoutingModule } from './jugadores-routing.module';
import { JugadoresComponent } from './jugadores.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";
import { ImageModule } from 'primeng/image';
@NgModule({
  declarations: [JugadoresComponent],
  imports: [
    CommonModule,
    JugadoresRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ReactiveFormsModule,
    PasswordModule,
    ImageModule,
  ]
})
export class JugadoresModule { }
