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

  file: File | any;

  cols: any[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];
  
  isUpdate:boolean=false;

  fileSelect:any;

  idDisciplinaUpdate:any

  imagen:any;

  public formJugadores!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private jugadoresService: JugadoresService
  ) {
    this.formJugadores= formBuilder.group({
      nombre:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]],
      apellido:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]],
      cedula:['',[Validators.required,Validators.minLength(10),]],
      foto: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.showJugadores()
  }

  savePosiciones(){
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

deleteSelectedProducts() {
  this.deleteProductsDialog = true;
}

editDisciplina(id:any) {
  this.idDisciplinaUpdate=id
    let data =this.jugadores.find( (e:any) =>e.id==id)
    console.log(data);
    if (data) {
      this.isUpdate=true
      this.openNew()
      this.formJugadores.controls['nombre'].setValue(data?.nombre),
      this.formJugadores.controls['apellido'].setValue(data?.apellido),
      this.formJugadores.controls['cedula'].setValue(data?.cedula)     
    }
}

updateDisciplina(){
  if (this.formJugadores.valid) {
    let data : JugadoresInterface={
        nombre:this.formJugadores.value.nombre,
        apellido:this.formJugadores.value.apellido,
        cedula:this.formJugadores.value.cedula,
        foto: this.file
    }
    this.jugadoresService.updateJugadores(data,this.idDisciplinaUpdate).subscribe({
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

deleteDisciplina(id: any) {
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
