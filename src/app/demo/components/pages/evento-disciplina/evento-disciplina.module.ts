import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';

import { EventoDisciplinaRoutingModule } from './evento-disciplina-routing.module';
import { EventoDisciplinaComponent } from './evento-disciplina.component';


@NgModule({
  declarations: [EventoDisciplinaComponent],
  imports: [
    CommonModule,
    EventoDisciplinaRoutingModule,
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
    CardModule,
    FieldsetModule
  ]
})
export class EventoDisciplinaModule { }
