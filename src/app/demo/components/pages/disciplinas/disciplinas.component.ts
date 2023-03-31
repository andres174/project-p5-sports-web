import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { DisciplinasService } from 'src/app/demo/service/disciplinas.service';
import { DisciplinaInterface } from './disciplina_interface';
import { log } from 'console';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  providers: [MessageService]
 // styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent {
  submitted: boolean = false;

  disciplinaDialog: boolean = false;

  deletedisciplinaDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  disciplinas:any
  cols: any[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];
  
  isUpdate:boolean=false;
  idDisciplinaUpdate:any

  public formDisciplinas!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private disciplinasService: DisciplinasService
  ) {
    this.formDisciplinas= formBuilder.group({
      nombre:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]]
    })
  }

  ngOnInit(): void {
    this.showDisciplinas()
  }

saveDisciplina(){
 if (this.formDisciplinas.valid) {
  let data : DisciplinaInterface={
      nombre:this.formDisciplinas.value.nombre
  }
  this.disciplinasService.guardarDisciplina(data).subscribe({
    next:(res)=>{
      console.log(res);
      this.hideDialog();
      this.formDisciplinas.reset()
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 } else {
   this.formDisciplinas.markAllAsTouched();
 }
}

showDisciplinas(){
 this.disciplinasService.mostrarDisciplinas().subscribe({
    next:(res)=>{
      this.disciplinas=res
      console.log(this.disciplinas);
      
    }
 })
}


hideDialog() {
  this.disciplinaDialog = false;
  this.submitted = false;
  if(this.isUpdate==true){
    this.formDisciplinas.reset()
    this.isUpdate=false
  }
}
openNew() {
  //this.product = {};
  this.submitted = false;
  this.disciplinaDialog = true;
}

deleteSelectedProducts() {
  this.deleteProductsDialog = true;
}

editDisciplina(id:any) {
  this.idDisciplinaUpdate=id
    let data =this.disciplinas.find( (e:any) =>e.id==id)
    console.log(data);
    if (data) {
      this.isUpdate=true
      this.openNew()
      this.formDisciplinas.controls['nombre'].setValue(data?.nombre)
    }
}

updateDisciplina(){
  if (this.formDisciplinas.valid) {
    let data : DisciplinaInterface={
        nombre:this.formDisciplinas.value.nombre
    }
    this.disciplinasService.updateDisciplinas(data,this.idDisciplinaUpdate).subscribe({
      next:(res)=>{
        console.log(res);
        this.hideDialog()
        this.formDisciplinas.reset()
        this.showDisciplinas()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
   } else {
     this.formDisciplinas.markAllAsTouched();
   }
}
deleteDisciplina(id: any) {
  this.disciplinasService.deleteDisciplina(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.showDisciplinas();
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}



