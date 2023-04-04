import { Component, OnInit} from '@angular/core';
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


export class PosicionesComponent implements OnInit {
  
  submitted: boolean = false;

  posicionesDialog: boolean = false;

  deleteposicionesDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  selectedPosicion:[]=[]

  posiciones:any
  cols: any[] = [];
  idUsuario=3


/*   product: Product = {}; */

/*   selectedProducts: Product[] = []; */
  
  isUpdate:boolean=false;
  idPosicionesUpdate:any
  idPosicionDelete:any
  grupoPosiciones:any

  public formPosiciones!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private posicionesService: PosicionesService,
    private messageService: MessageService,
  ) {
    this.formPosiciones= formBuilder.group({
      descripcion:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]]
    })
  }

  ngOnInit(): void {
    this.showPosiciones()
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
  
    deletePosiciones(id:any){
    this.deleteposicionesDialog=true
    this.idPosicionDelete=id
  }


confirmDelete() {
    this.posicionesService.deletePosiciones(this.idPosicionDelete).subscribe({
      next:(res)=>{
        this.successMessage(res.message)
        this.deleteposicionesDialog=false
        this.showPosiciones()
      },
      error:(err)=>{
        this.errorMessage(err)
      }
    })
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
  this.posicionesService.mostrarPosiciones().subscribe({
    next:(res)=>{
      this.posiciones=res
      console.log(this.posiciones);
    },
    error:(err)=>{
      console.log(err);
    }
  })
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

deletedSelectedPosiciones(){
  this.deleteProductsDialog=true
}


  }

