import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { JugadoresService } from 'src/app/demo/service/jugadores.service';
import { JugadoresInterface } from './jugadores-interface';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
  providers: [MessageService],
})
export class JugadoresComponent implements OnInit  {
  submitted: boolean = false;

  jugadoresDialog: boolean = false;

  deleteJugadoresDialog: boolean = false;

  deletejugadoreDialog: boolean = false;

  jugadores:any
  cols: any[] = [];

  product: Product = {};

selectedJugadores: Product[] = [];
  
  isUpdate:boolean=false;
  idJugadoresUpdate:any
  idJugadoresDelete:any


  public formJugadores!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private jugadoresService: JugadoresService,
    private messageService: MessageService,
  ) {
    this.formJugadores= formBuilder.group({
      nombre:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]],
      apellido:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]],
      cedula:['',[Validators.required]],
    })
  }

  ngOnInit(){
    this.showJugadores()
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

  saveJugadores(){
    if (this.formJugadores.valid) {
     let data : JugadoresInterface={
       nombre:this.formJugadores.value.nombre,
       apellido:this.formJugadores.value.apellido,
       cedula:this.formJugadores.value.cedula
     }
     this.jugadoresService.guardarJugadores(data).subscribe({
       next:(res)=>{
        this.successMessage(res.message)

        this.hideDialog();
         this.formJugadores.reset()
         
       },
       error:(err)=>{
      this.errorMessage(err)
         
       }
     })
    } else {
      this.formJugadores.markAllAsTouched();
    }
   }

  showJugadores(){
    this.jugadoresService.mostrarJugadores().subscribe({
       next:(res)=>{
         this.jugadores=res
         console.log(this.jugadores);     
       }
    })
   }

   hideDialog() {
    this.jugadoresDialog = false;
    this.submitted = false;
    if(this.isUpdate==true){
      this.formJugadores.reset()
      this.isUpdate=false
    }
  }

  openNew() {
    //this.product = {};
    this.submitted = false;
    this.jugadoresDialog = true;
  }
  
  deletedSelectedJugadores(){
    this.deletejugadoreDialog=true
  }

  editJugadores(id:any) {
    this.idJugadoresUpdate=id
      let data =this.jugadores.find( (e:any) =>e.id==id)
      console.log(data);    
      if (data) {      
        this.isUpdate=true     
        this.openNew()
        this.formJugadores.controls['nombre'].setValue(data?.nombre)
        this.formJugadores.controls['apellido'].setValue(data?.apellido)
        this.formJugadores.controls['cedula'].setValue(data?.cedula)
      }
  }

  /* getJugadorImage(idd: JugadoresInterface) {
    if (idd.foto)
      return `${environment.jugUrl}${idd.id}/${idd.foto}`;
    else return "";
  } */

  updateJugadores(){
    debugger
    if (this.formJugadores.valid) {
      debugger
      let data : JugadoresInterface={
          nombre:this.formJugadores.value.nombre,
          apellido:this.formJugadores.value.apellido,
          cedula:this.formJugadores.value.cedula
      }
      this.jugadoresService.updateJugadores(data,this.idJugadoresUpdate).subscribe({
        next:(res)=>{
          this.successMessage(res.message)
          this.hideDialog()
          this.formJugadores.reset()
          this.showJugadores()
        },
        error:(err)=>{
          this.errorMessage(err)
          
        }
      })
     } else {
      debugger
       this.formJugadores.markAllAsTouched();
     }
  }
  

  deleteJugadores(id:any){
    this.idJugadoresDelete=id
  this.deleteJugadoresDialog=true
}

confirmDelete() {
  this.jugadoresService.deleteJugadores(this.idJugadoresDelete).subscribe({
    next:(res)=>{
      this.successMessage(res.message)
      this.jugadoresDialog=false
      this.showJugadores()
    },
    error:(err)=>{
      this.errorMessage(err)
    }
  })
}




 /*  saveJugadores() {
    if (!this.formJugadores.valid) {
      this.formJugadores.markAllAsTouched();
      return;
    }

    this.loading = true;
    const values = { ...this.formJugadores.value };

    if (!this.jugador.id) {
      // crear
      const data = new FormData();

      Object.keys(values).forEach((key) => {
        data.append(key, values[key]);
      });

      if (this.selectedImageFile) {
        data.append("foto_perfil", this.selectedImageFile);
      }

      this.jugadoresService.guardarJugadores(data).subscribe({
        next: (res) => {
          this.showJugadores();
          console.log(res);
          this.successMessage("Jugador Creado");
        },
        error: console.log,
      });
    } else {

      if (this.selectedImageFile) {
        const imageData = new FormData();
        imageData.append("foto_perfil", this.selectedImageFile);
        this.jugadoresService.editImageJugadores(imageData, this.jugador.id)
          .subscribe({
            next: console.log,
            error: console.log,
          });
      }

      const data = {
        nombre: values.nombre,
        apellido: values.apellido,
        cedula: values.cedula,
      };

      this.jugadoresService.updateJugadores(data, this.jugador.id).subscribe({
        next: (res) => {
          this.showJugadores();
          console.log(res);
          this.successMessage("Organizador Actualizado");
        },
        error: console.log,
      });
    }

    this.hideDialog();
    this.jugador = {};
  } */

/*    clearSelectedImage() {
    this.selectedImageSrc = "";
    this.selectedImageFile = undefined;
  } */

/*   onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  } */

/*   onImageSelect(event: any) {
    this.selectedImageFile = event.files[0];
    if (!this.selectedImageFile) return;
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      this.selectedImageSrc = e.currentTarget.result;
    };
    reader.readAsDataURL(this.selectedImageFile);
  } */

 /*  onImageClear() {
    this.clearSelectedImage();
  } */

  confirmDeleteSelectedJugadores() {

    let grupoJugadores=this.selectedJugadores.map((dis:any)=>dis.id)
  
    this.jugadoresService.deleteSelectJugadores(grupoJugadores).subscribe({
      next:(res)=>{
          this.successMessage(res.message)
          this.deletejugadoreDialog=false
          this.showJugadores
      },
      error:(err)=>{
       console.log(err)
          this.errorMessage(err)
      }
  
    })
  }



}
