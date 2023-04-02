import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionInterface } from './configuracion.interface';
import { ConfiguracionService } from 'src/app/demo/service/configuracion.service';

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
  idUsuario=3

  // product: Product = {};

  // selectedProducts: Product[] = [];
  
  isUpdate:boolean=false;
  idConfiguracionUpdate:any

  public formConfiguracion!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private configuracionService:ConfiguracionService
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

  ngOnInit(): void {
    this.showConfiguracion()
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
        this.formConfiguracion.controls['nombre'].setValue(data?.nombre)
        this.formConfiguracion.controls['numero_grupos'].setValue(data?.numero_grupos)
        this.formConfiguracion.controls['numero_miembros'].setValue(data?.numero_miembros)
        this.formConfiguracion.controls['minutos_juego'].setValue(data?.minutos_juego)
        this.formConfiguracion.controls['minutos_entre_partidos'].setValue(data?.minutos_entre_partidos)
        this.formConfiguracion.controls['ida_y_vuelta'].setValue(data?.ida_y_vuelta)
        this.formConfiguracion.controls['tarjetas'].setValue(data?.tarjetas)
      }
  }
  
  deleteConfiguracion(id: any) {
    this.configuracionService.deleteConfiguracion(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.showConfiguracion()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  saveConfiguracion(){
    
    if(this.formConfiguracion.valid){

      let data: ConfiguracionInterface={
        nombre:                 this.formConfiguracion.value.nombre,
        numero_grupos:          this.formConfiguracion.value.numero_grupos , 
        numero_miembros:        this.formConfiguracion.value.numero_miembros,
        minutos_juego:          this.formConfiguracion.value.minutos_juego,
        minutos_entre_partidos: this.formConfiguracion.value.minutos_entre_partidos,
        tarjetas:               this.formConfiguracion.value.ida_y_vuelta,
        ida_y_vuelta:           this.formConfiguracion.value.tarjetas,
        id_organizador:3
      }
      this.configuracionService.saveConfiguracion(data).subscribe({
        next:(res)=>{
          console.log(res);

        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    else{
      this.formConfiguracion.markAllAsTouched()
    }
  }

  showConfiguracion(){
    this.configuracionService.showConfiguraciones().subscribe({
      next:(res)=>{
        this.configuracion=res
        console.log(this.configuracion);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  updateConfiguracion(){
    if (this.formConfiguracion.valid) {
      let data: ConfiguracionInterface={
        nombre:                 this.formConfiguracion.value.nombre,
        numero_grupos:          this.formConfiguracion.value.numero_grupos , 
        numero_miembros:        this.formConfiguracion.value.numero_miembros,
        minutos_juego:          this.formConfiguracion.value.minutos_juego,
        minutos_entre_partidos: this.formConfiguracion.value.minutos_entre_partidos,
        tarjetas:               this.formConfiguracion.value.ida_y_vuelta,
        ida_y_vuelta:           this.formConfiguracion.value.tarjetas,
        id_organizador:3
      }
      this.configuracionService.updateConfiguracion(data, this.idConfiguracionUpdate).subscribe({
        next:(res)=>{
          console.log(res);
          this.hideDialog()
          this.showConfiguracion()
          this.formConfiguracion.reset()
        },
        error:(err)=>{
          console.log(err);
        }
      })
    } else {
      this.formConfiguracion.markAllAsTouched()
    }
  }

}
