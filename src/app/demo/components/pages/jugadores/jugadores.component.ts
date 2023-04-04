import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { JugadoresService } from 'src/app/demo/service/jugadores.service';
import { JugadoresInterface } from './jugadores-interface';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent {
  submitted: boolean = false;

  jugadoresDialog: boolean = false;

  deletejugadoresDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  jugadores:any
  selectedConfig:[]=[]

  cols: any[] = [];
  file: File | any;

  jugador: any[] = [];
  idUsuario=3
  product: Product = {};

  selectedProducts: Product[] = [];
  
  isUpdate:boolean=false;

  fileSelect:any;

  idJugadoresUpdate:any


  imagen:any;

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
      foto: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
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
  


  editJugadores(id:any) {
    this.idJugadoresUpdate=id
      let data =this.jugadores.find( (e:any) =>e.id==id)
      console.log(data);
      if (data) {
        this.isUpdate=true
        this.openNew()
        this.formJugadores.controls['nombre'].setValue(data?.nombre)
        this.formJugadores.controls['apelido'].setValue(data?.apellido)
        this.formJugadores.controls['cedula'].setValue(data?.cedula)
      }
  }
  
  deleteJugador(id:any){
    this.deletejugadoresDialog=true
    this.idJugadoresDelete=id
  }

  confirmDelete() {
    this.jugadoresService.deleteJugadores(this.idJugadoresDelete).subscribe({
      next:(res)=>{
        this.successMessage(res.message)
        this.deletejugadoresDialog=false
        this.showJugadores()
      },
      error:(err)=>{
        this.errorMessage(err)
      }
    })
  }

  saveJugadores(){
    if (this.formJugadores.valid) {
     let data : JugadoresInterface={
       nombre:this.formJugadores.value.nombre,
       apellido:this.formJugadores.value.apellido,
       cedula:this.formJugadores.value.cedula,
       foto: this.file
     }
     this.jugadoresService.guardarJugadores(data).subscribe({
       next:(res)=>{
         console.log(res);
         this.hideDialog();
         this.formJugadores.reset()
         
       },
       error:(err)=>{
         console.log(err);
         
       }
     })
    } else {
      this.formJugadores.markAllAsTouched();
    }
   }

showJugadores(){
  debugger
  this.jugadoresService.mostrarJugadores().subscribe({
     next:(res)=>{
      debugger
       this.jugadores=res
       debugger
       console.log(this.jugadores);     
     }
  })
 }


updateJugadores(){
  if (this.formJugadores.valid) {
    let data : JugadoresInterface={
        nombre:this.formJugadores.value.nombre,
        apellido:this.formJugadores.value.apellido,
        cedula:this.formJugadores.value.cedula,
        foto: this.file
    }
    this.jugadoresService.updateJugadores(data,this.idJugadoresUpdate).subscribe({
      next:(res)=>{
        console.log(res);
        this.hideDialog()
        this.formJugadores.reset()
        this.showJugadores()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   } else {
     this.formJugadores.markAllAsTouched();
   }
}

deleteSelectedJugadores() {
  this.deleteProductsDialog = true;
}




deleteJugadores(id: any) {
  this.jugadoresService.deleteJugadores(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.showJugadores();
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

getFile(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.fileSelect = reader.result;
  };
  this.file = (event.target).files[0];
}


getFiles(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.fileSelect = reader.result;
  };
  this.file = (event.target).files[0];
   this.imagen = {
    id: this.isUpdate,
    imagen: this.file,
  };    
  this.jugadoresService.editImageJugadores(this.imagen).subscribe({
    next:(res)=> {
      console.log(res);
    },
  });
}

}
