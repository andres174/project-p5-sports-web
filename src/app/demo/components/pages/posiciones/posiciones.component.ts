import { Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { PosicionesService } from 'src/app/demo/service/posiciones.service';
import { PosicionesInterface } from './posiciones-interface';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
    styleUrls: ['./posiciones.component.scss'],
  providers: [MessageService],
})
export class PosicionesComponent implements OnInit {
  submitted: boolean = false;

  posicionesDialog: boolean = false;

  deleteposicionesDialog: boolean = false;

  deletePosicioneDialog: boolean = false;

  posiciones:any
  cols: any[] = [];

  product: Product = {};

selectedPosiciones: Product[] = [];
  
  isUpdate:boolean=false;
  idPosicionesUpdate:any
  idPosicionDelete:any


  public formPosiciones!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private posicionesService: PosicionesService,
    private messageService: MessageService,
  ) {
    this.formPosiciones= formBuilder.group({
      descripcion: ['', [Validators.required]],
      
    })
  }

  ngOnInit(){
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

  savePosiciones(){
    if (this.formPosiciones.valid) {
     let data : PosicionesInterface={
       descripcion:this.formPosiciones.value.descripcion
     }
     this.posicionesService.guardarPosiciones(data).subscribe({
       next:(res)=>{
        this.successMessage(res.message)

        this.hideDialog();
         this.formPosiciones.reset()
         
       },
       error:(err)=>{
      this.errorMessage(err)
         
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

  deletedSelectedPosiciones(){
    this.deletePosicioneDialog=true
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
          this.successMessage(res.message)
          this.hideDialog()
          this.formPosiciones.reset()
          this.showPosiciones()
        },
        error:(err)=>{
          this.errorMessage(err)
          
        }
      })
     } else {
       this.formPosiciones.markAllAsTouched();
     }
  }

    deletePosiciones(id:any){
      this.idPosicionDelete=id
    this.deleteposicionesDialog=true
  }

confirmDelete() {
    this.posicionesService.deletePosiciones(this.idPosicionDelete).subscribe({
      next:(res)=>{
        this.successMessage(res.message)
        this.posicionesDialog=false
        this.showPosiciones()
      },
      error:(err)=>{
        this.errorMessage(err)
      }
    })
}
  
confirmDeleteSelectedPosiciones() {

  let grupoPosiciones=this.selectedPosiciones.map((dis:any)=>dis.id)

  this.posicionesService.deleteSelectPosiciones(grupoPosiciones).subscribe({
    next:(res)=>{
        this.successMessage(res.message)
        this.deletePosicioneDialog=false
        this.showPosiciones
    },
    error:(err)=>{
     console.log(err)
        this.errorMessage(err)
    }

  })
}

  }

