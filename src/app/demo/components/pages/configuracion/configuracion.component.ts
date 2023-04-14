import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionInterface } from './configuracion.interface';
import { ConfiguracionService } from 'src/app/demo/service/configuracion.service';
import { Table } from 'primeng/table';

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

  deleteConfiguracionesDialog: boolean = false;

  selectedConfig:[]=[]

  configuracion:any
  cols: any[] = [];
  idUsuario=localStorage.getItem('id')

  // product: Product = {};

  // selectedProducts: Product[] = [];
  
  isUpdate:boolean=false;
  idConfiguracionUpdate:any
  idConfiguracionDelete:any
  grupoConfiguracion:any

  public formConfiguracion!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private configuracionService:ConfiguracionService,
    private messageService: MessageService,
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
  
  confirmDeleteSelected() {
    this.grupoConfiguracion=this.selectedConfig.map((u:any) =>u.id)
    this.configuracionService.deleteSelectConfiguracion(this.grupoConfiguracion).subscribe({
      next: (res)=>{
        this.successMessage(res.message)
        this.deleteConfiguracionesDialog = false;
        this.showConfiguracion()
      },
      error:(err)=>{
        this.errorMessage(err)
      }
    })
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
  
  deleteConfiguracion(id:any){
    this.deleteConfiguracionDialog=true
    this.idConfiguracionDelete=id
  }

  confirmDelete() {
    this.configuracionService.deleteConfiguracion(this.idConfiguracionDelete).subscribe({
      next:(res)=>{
        this.successMessage(res.message)
        this.deleteConfiguracionDialog=false
        this.showConfiguracion()
      },
      error:(err)=>{
        this.errorMessage(err)
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
        id_organizador:         Number(this.idUsuario)
      }
      this.configuracionService.saveConfiguracion(data).subscribe({
        next:(res)=>{
          this.successMessage(res.message)
          this.hideDialog()
          this.showConfiguracion()
          this.formConfiguracion.reset()

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
        id_organizador:         Number(this.idUsuario)
      }
      this.configuracionService.updateConfiguracion(data, this.idConfiguracionUpdate).subscribe({
        next:(res)=>{
          this.successMessage(res.message)
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

  deletedSelectedConfig(){
      this.deleteConfiguracionesDialog=true
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  
}
