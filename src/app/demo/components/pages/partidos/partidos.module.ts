import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidosRoutingModule } from './partidos-routing.module';
import { TableModule } from 'primeng/table';import { FileUploadModule } from 'primeng/fileupload';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PartidosComponent } from './partidos.component';
import { CalendarModule } from "primeng/calendar";
@NgModule({
  declarations: [PartidosComponent],
  imports: [
    CommonModule,
    PartidosRoutingModule,
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
    InputNumberModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputSwitchModule, 
    CalendarModule,
  ]
})
export class PartidosModule { }
