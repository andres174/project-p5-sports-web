import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { EventoInterface } from './eventos.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/demo/service/event.service';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls:  ['./eventos.component.scss'],
  providers: [MessageService],
})
export class EventosComponent implements OnInit {



  submitted: boolean = false;

  eventosDialog: boolean = false;

  deleteEventoDialog: boolean = false;
  
  deleteEventosDialog: boolean = false;

  eventos: EventoInterface[] = [];
  evento: EventoInterface = {};

  selectedEventos: EventoInterface[] = [];

  formEventos: FormGroup;
  idUsuario=2

  selectedImageSrc: string = "";
  selectedImageFile: File | any;


  constructor(
    private formBuilder:FormBuilder,
    private EventService: EventService,
    private messageService: MessageService,
  )
  {
    this.formEventos=formBuilder.group({
      nombre: ['',[Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
    })
  }

  getEvento() {
    this.submitted = true;
    this.EventService.mostrarEvento().subscribe({
      next: (res) => {
        this.eventos = res;
        this.submitted = false;
      },
    });
  }

  ngOnInit(): void {
    this.getEvento()
  }

  successMessage(msg: string) {
    this.messageService.add({
      severity: "success",
      summary: "Acción exitosa",
      detail: msg,
      life: 3000,
    });
  }

  errorMessage(msg: string) {
    this.messageService.add({
      severity: "error",
      summary: "Ocurrio un Error",
      detail: msg,
      life: 3000,
    });
  }



  openNew() {
    //this.product = {};
    this.submitted = false;
    this.eventosDialog = true;
  }

  editEvento(event: EventoInterface) {
    this.evento = { ...event };
    this.formEventos.patchValue({ ...event });
    this.formEventos.get("nombre")?.removeValidators(Validators.required);
    this.formEventos.get("fecha_inicio")?.removeValidators(Validators.required);
    this.formEventos.get("fecha_fin")?.removeValidators(Validators.required);
    
    this.clearSelectedImage();
    this.eventosDialog = true;
  }

  getEventoImag(evento: EventoInterface) {
    if (evento.imagen)
      return `${environment.EventUrl}${evento.id}/${evento.imagen}`;
    else return "";
  }

  deleteSelectedEvento() {
    this.deleteEventosDialog = true;
  }

  deleteEvento(evento: EventoInterface) {
    this.deleteEventoDialog = true;
    this.evento = { ...evento };
  }

  confirmDeleteSelected() {
    this.deleteEventosDialog = false;
    this.submitted = true;

    this.EventService.deleteSelectedEvento(this.selectedEventos.map((u) => u.id))
      .subscribe({
        next: (res) => {
          this.getEvento();
          console.log(res);
          this.successMessage(res.message)
        },
        error: this.errorMessage,
      });

    this.selectedEventos = [];
  }

  confirmDelete() {
    this.deleteEventoDialog = false;
    this.submitted = true;

    this.EventService.deleteEvento(this.evento.id).subscribe({
      next: (res) => {
        this.getEvento();
        console.log(res);
        this.successMessage(res.message)
      },
      error: this.errorMessage,
    });

    this.evento = {};
  }


  hideDialog() {
    
    this.eventosDialog = false;
    
    this.clearSelectedImage();
  }

  saveEvento() {
    
    if (!this.formEventos.valid) {     
      let data: EventoInterface = {
        nombre: this.formEventos.value.nombre,
        fecha_inicio: this.formEventos.value.fecha_inicio,
        fecha_fin: this.formEventos.value.fecha_fin,
        id_organizador:2
      }; 
      this.formEventos.markAllAsTouched();
      return;
    }
    
    this.submitted = true;
    const values = { ...this.formEventos.value };
    
    if (!this.evento.id) {
      this.storeEvento(values);
    } else {
      this.updateEvento(values);
    }
   
    this.hideDialog();
    this.evento = {};
  }

  storeEvento(values: any) {
    const data = new FormData();
    

    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });
    
    if (this.selectedImageFile) {
      data.append("imagen", this.selectedImageFile);
    }
    console.log(data)
    
    
    this.EventService.guardarEvento(data).subscribe({
      next: (res) => {
        this.getEvento();
        console.log(res);
        this.successMessage(res.message)
      },

     // error: this.errorMessage,
    });
  }

  updateEvento(values: any) {
    if (this.selectedImageFile) {
      const imageData = new FormData();
      imageData.append("imagen", this.selectedImageFile);
      this.EventService.editimagenEvento(imageData, this.evento.id)
        .subscribe({
          next: console.log,
          error: console.log,
        });
    }

    let data: EventoInterface = {
      nombre: this.formEventos.value.nombre,
      fecha_inicio: this.formEventos.value.fecha_inicio,
      fecha_fin: this.formEventos.value.fecha_fin,
      id_organizador:2
    };

    // console.log(data);

    this.EventService.updateEvento(data, this.evento.id).subscribe({
      next: (res) => {
        this.getEvento();
        console.log(res);
        this.successMessage("Evento Actualizado");
      },
      error: this.errorMessage,
    });
  }

  clearSelectedImage() {
    
    this.selectedImageSrc = "";
    this.selectedImageFile = undefined;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onImageSelect(event: any) {
    this.selectedImageFile = event.files[0];
    if (!this.selectedImageFile) return;
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      this.selectedImageSrc = e.currentTarget.result;
    };
    reader.readAsDataURL(this.selectedImageFile);
  }

  onImageClear() {
    this.clearSelectedImage();
  }
}
