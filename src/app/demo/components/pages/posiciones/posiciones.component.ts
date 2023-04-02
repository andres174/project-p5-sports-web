import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { PosicionesService } from 'src/app/demo/service/posiciones.service';
import { PosicionesInterface } from './posiciones-interface';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.scss']
})


export class PosicionesComponent {
  submitted: boolean = false;

  posicionesDialog: boolean = false;

  deleteposicionesDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  posiciones:any
  cols: any[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];
  
  isUpdate:boolean=false;
  idPosicionesUpdate:any

  public formPosiciones!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private posicionesService: PosicionesService
  ) {
    this.formPosiciones= formBuilder.group({
      descripcion:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]]
    })
  }

  ngOnInit(): void {
    this.showPosiciones()
  }

savePosiciones(){
 if (this.formPosiciones.valid) {
  let data : PosicionesInterface={
    descripcion:this.formPosiciones.value.descripcion
  }
  this.posicionesService.guardarPosiciones(data).subscribe({
    next:(res)=>{
      console.log(res);
      this.hideDialog();
      this.formPosiciones.reset()
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 } else {
   this.formPosiciones.markAllAsTouched();
 }
}

showPosiciones(){
  debugger
 this.posicionesService.mostrarPosiciones().subscribe({
  
    next:(res)=>{
      debugger
      this.posiciones=res
      debugger
      console.log(this.posiciones);
      
    }
 })
}


hideDialog() {
  this.posicionesDialog = false;
  this.submitted = false;
  if(this.isUpdate==true){
    this.formPosiciones.reset()
    this.isUpdate=false
  }
}
openNew() {
  //this.product = {};
  this.submitted = false;
  this.posicionesDialog = true;
}

deleteSelectedProducts() {
  this.deleteProductsDialog = true;
}

editPosiciones(id:any) {
  this.idPosicionesUpdate=id
    let data =this.posiciones.find( (e:any) =>e.id==id)
    console.log(data);
    if (data) {
      this.isUpdate=true
      this.openNew()
      this.formPosiciones.controls['descripcion'].setValue(data?.descripcion)
    }
}

updatePosiciones(){
  if (this.formPosiciones.valid) {
    let data : PosicionesInterface={
        descripcion:this.formPosiciones.value.descripcion
    }
    this.posicionesService.updatePosiciones(data,this.idPosicionesUpdate).subscribe({
      next:(res)=>{
        console.log(res);
        this.hideDialog()
        this.formPosiciones.reset()
        this.showPosiciones()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   } else {
     this.formPosiciones.markAllAsTouched();
   }
}
deletePosiciones(id: any) {
  this.posicionesService.deletePosiciones(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.showPosiciones();
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}


}
