import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
  providers: [MessageService]
})
export class ConfiguracionComponent {

  submitted: boolean = false;

  configuracionDialog: boolean = false;

  deleteConfiguracionDialog: boolean = false;

  deleteConfigutacionDialog: boolean = false;

  configuracion:any
  cols: any[] = [];

  // product: Product = {};

  // selectedProducts: Product[] = [];
  
  isUpdate:boolean=false;
  idConfiguracionUpdate:any

  public formConfiguracion!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
  )
  {
    this.formConfiguracion=formBuilder.group({
      nombre:                 ['',[Validators.required,Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]],
      numero_grupos:          ['',[Validators.required]],
      numero_miembros:        ['',[Validators.required]],
      minutos_juego:          ['',[Validators.required]],
      minutos_entre_partidos: ['',[Validators.required]],
      tarjetas:               ['',[Validators.required]],
      ida_y_vuelta:           ['',[Validators.required]]
    })
  }
  hideDialog() {
    this.configuracionDialog = false;
    this.submitted = false;
    if(this.isUpdate==true){
      this.formConfiguracion.reset()
      this.isUpdate=false
    }
  }
  openNew() {
    //this.product = {};
    this.submitted = false;
    this.configuracionDialog = true;
  }
  
  deleteSelectedProducts() {
    this.deleteConfiguracionDialog = true;
  }

  editConfiguracion(id:any) {
    this.idConfiguracionUpdate=id
      let data =this.configuracion.find( (e:any) =>e.id==id)
      console.log(data);
      if (data) {
        this.isUpdate=true
        this.openNew()
       // this.configuracion.controls['nombre'].setValue(data?.nombre)
      }
  }
  
  deleteConfiguracion(id: any) {
    // this.disciplinasService.deleteDisciplina(id).subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //     this.showDisciplinas();
    //   },
    //   error:(err)=>{
    //     console.log(err);
        
    //   }
    // })
  }
  saveConfiguracion(){
    //console.log(this.formConfiguracion.value.numero_grupos);
  }

}
