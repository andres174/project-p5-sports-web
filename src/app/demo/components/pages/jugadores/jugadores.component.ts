import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { Table } from "primeng/table";
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { JugadoresService } from 'src/app/demo/service/jugadores.service';
import { JugadoresInterface } from './jugadores-interface';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
  providers: [MessageService],
})
export class JugadoresComponent implements OnInit  {
  submitted: boolean = false;

  jugadoresDialog: boolean = false;
  deleteJugadoreDialog: boolean = false;
  deleteJugadoresDialog: boolean = false;

  jugadores: JugadoresInterface[] = [];
  jugadore: JugadoresInterface = {};
  selectedJugadores: JugadoresInterface[] = [];

  formJugadores: FormGroup;

  selectedImageSrc: string = "";
  selectedImageFile: File | any;



  constructor(
    private formBuilder: FormBuilder,
    private jugadoresService: JugadoresService,
    private messageService: MessageService,
  ) {
    this.formJugadores= formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
    })
  }
  getJugadores() {
    this.submitted = true;
    this.jugadoresService.mostrarJugadores().subscribe({
      next: (res) => {
        this.jugadores = res;
        this.submitted = false;
      },
    });
  }

  ngOnInit(){
    this.getJugadores()
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
    this.jugadoresDialog = true;
  }

  editJugadores(jugar: JugadoresInterface) {
    this.jugadore = { ...jugar };
    this.formJugadores.patchValue({ ...jugar });
    this.formJugadores.get("nombre")?.removeValidators(Validators.required);
    this.formJugadores.get("apellido")?.removeValidators(Validators.required);
    this.formJugadores.get("cedula")?.removeValidators(Validators.required);
    
    this.clearSelectedImage();
    this.jugadoresDialog = true;
  }

  getJugadoresImage(jugar: JugadoresInterface) {
    if (jugar.foto)
      return `${environment.jugUrl}${jugar.id}/${jugar.foto}`;
    else return "";
  }

  deleteSelectedJugadores() {
    this.deleteJugadoresDialog = true;
  }

  deleteJugadores(jugar: JugadoresInterface) {
    this.deleteJugadoreDialog = true;
    this.jugadore = { ...jugar };
  }

  confirmDeleteSelected() {
    this.deleteJugadoresDialog = false;
    this.submitted = true;

    this.jugadoresService.deleteSelectJugadores(this.selectedJugadores.map((u) => u.id))
      .subscribe({
        next: (res) => {
          this.getJugadores();
          console.log(res);
          this.successMessage(res.message)
        },
        error: this.errorMessage,
      });

    this.selectedJugadores = [];
  }

  confirmDelete() {
    this.deleteJugadoreDialog = false;
    this.submitted = true;

    this.jugadoresService.deleteJugadores(this.jugadore.id)
    .subscribe({
      next: (res) => {
        this.getJugadores();
        console.log(res);
        this.successMessage(res.message)
      },
      error: this.errorMessage,
    });
    

    this.jugadore = {};
  }

  hideDialog() {
    this.jugadoresDialog = false;
    this.clearSelectedImage();
  }

  saveJugadores() {
    debugger
    if (!this.formJugadores.valid) {
      this.formJugadores.markAllAsTouched();
      return;
    }

    this.submitted = true;
    const values = { ...this.formJugadores.value };
    if (!this.jugadore.id) {
      this.storeJugadores(values);
    } else {
      this.updateJugadores(values);
    }
    this.hideDialog();
    this.jugadore = {};
  }


  storeJugadores(values: any) {
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });

    if (this.selectedImageFile) {
      data.append("foto", this.selectedImageFile);
    }

    this.jugadoresService.guardarJugadores(data).subscribe({
      next: (res) => {
        this.getJugadores();
        console.log(res);
         this.successMessage(res.message)
      },
      error: this.errorMessage,
    });
  }

  updateJugadores(values: any) {
 
    if (this.selectedImageFile) {
      let imageData = new FormData();
      imageData.append("foto", this.selectedImageFile);
      this.jugadoresService.editImageJugadores(imageData, this.jugadore.id)
        .subscribe({
          next: console.log,
          error: console.log,
        });
    }

    let data = {
      nombre: values.nombre,
      apellido: values.apellido,
      cedula: values.cedula,
    };

    this.jugadoresService.updateJugadores(data, this.jugadore.id).subscribe({
      next: (res) => {
        this.getJugadores();
        console.log(res);
        this.successMessage(res.message);
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
  let reader = new FileReader();
  reader.onloadend = (e: any) => {
    this.selectedImageSrc = e.currentTarget.result;
  };
  reader.readAsDataURL(this.selectedImageFile);
}

onImageClear() {
  this.clearSelectedImage();
}

}
