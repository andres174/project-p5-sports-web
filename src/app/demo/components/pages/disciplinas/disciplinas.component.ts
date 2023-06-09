import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { DisciplinasService } from 'src/app/demo/service/disciplinas.service';
import { DisciplinaInterface } from './disciplina_interface';
import { Table } from 'primeng/table';

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

  deleteDisciplinasDialog: boolean = false;

  disciplinas:any
  cols: any[] = [];

  product: Product = {};

  selectedDisciplinas: Product[] = [];
  
  isUpdate:boolean=false;
  idDisciplinaUpdate:any
  idDisciplinaDelete:any


  public formDisciplinas!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private disciplinasService: DisciplinasService,
    private messageService:MessageService
  ) {
    this.formDisciplinas= formBuilder.group({
      nombre:['',[Validators.required, Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),Validators.minLength(4),]]
    })
  }

  ngOnInit(): void {
    this.showDisciplinas()
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

saveDisciplina(){
 if (this.formDisciplinas.valid) {
  let data : DisciplinaInterface={
      nombre:this.formDisciplinas.value.nombre
  }
  this.disciplinasService.guardarDisciplina(data).subscribe({
    next:(res)=>{
      this.successMessage(res.message)
     
      this.hideDialog();
      this.formDisciplinas.reset()
      
    },
    error:(err)=>{
      this.errorMessage(err)
      
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

deleteSelectedDisciplinas() {
  this.deleteDisciplinasDialog = true;
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
        this.successMessage(res.message)
        this.hideDialog()
        this.formDisciplinas.reset()
        this.showDisciplinas()
      },
      error:(err)=>{
        this.errorMessage(err)
        
      }
    })
   } else {
     this.formDisciplinas.markAllAsTouched();
   }
}

deleteDisciplina(id: any) {
  this.idDisciplinaDelete=id
  this.deletedisciplinaDialog=true
}

confirmDelete(){
  this.disciplinasService.deleteDisciplina(this.idDisciplinaDelete).subscribe({
    next:(res)=>{
      this.successMessage(res.message)
      this.disciplinaDialog=false
      this.showDisciplinas();
    },
    error:(err)=>{
      this.errorMessage(err)
    }
  })
}

// onGlobalFilter(table: Table, event: Event) {
//   table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
// }

confirmDeleteSelectedDisciplinas() {
  let grupoDsiciplinas=this.selectedDisciplinas.map((dis:any)=>dis.id)
  this.disciplinasService.deleteSelectDisciplinas(grupoDsiciplinas).subscribe({
    next:(res)=>{
        this.successMessage(res.message)
        this.deleteDisciplinasDialog=false
        this.showDisciplinas
    },
    error:(err)=>{
        this.errorMessage(err)
    }

  })
}

}



