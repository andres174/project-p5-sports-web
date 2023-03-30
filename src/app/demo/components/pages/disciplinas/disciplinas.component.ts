import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { DisciplinasService } from 'src/app/demo/service/disciplinas.service';
import { DisciplinaInterface } from './disciplina_interface';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  providers: [MessageService]
 // styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent {
  submitted: boolean = false;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  disciplinas:any
 

  product: Product = {};

  selectedProducts: Product[] = [];

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
  this.productDialog = false;
  this.submitted = false;
}
openNew() {
  //this.product = {};
  this.submitted = false;
  this.productDialog = true;
}

deleteSelectedProducts() {
  this.deleteProductsDialog = true;
}

editProduct(product: Product) {

}
deleteProduct(product: Product) {

}
}



