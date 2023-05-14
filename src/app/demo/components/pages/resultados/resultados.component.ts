import { ResultadoInterface } from './resultados.interface';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoService } from 'src/app/demo/service/resultado.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  providers: [MessageService]
})
export class ResultadosComponent implements OnInit{

  submitted: boolean = false;

  resultadoDialog: boolean = false;

  deleteResultadoDialog: boolean = false;
  
  deleteResultadosDialog: boolean = false;

  resultados: ResultadoInterface[] = [];
  resultado: ResultadoInterface = {};

  selectedResultado: ResultadoInterface[] = [];

  formResultados: FormGroup;

  isUpdate:boolean=false;


  equipo_disciplinas: any[] = [];
  equipo_disciplinas_selected: any;

  
  partidos: any[] = [];
  partidos_selected: any;


  constructor(
    private formBuilder: FormBuilder,
    private resultadoService: ResultadoService,
    private messageService: MessageService,
  ) {
    this.formResultados=formBuilder.group({
      puntos:          ['',[Validators.required]],
      goles_favor:        ['',[Validators.required]],
      goles_contra:          ['',[Validators.required]],
      id_equipo_disciplina: ['',[Validators.required]],
      id_partido:               ['',[Validators.required]]
    })
  }

  getResultados() {
    this.submitted = true;
    this.resultadoService.showResultado().subscribe({
      next: (res) => {
        this.resultados = res;
        this.submitted = false;
      },
    });
  }

  ngOnInit(): void {
    this.getResultados()
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

  openNew() {
    //this.product = {};
    this.submitted = false;
    this.resultadoDialog = true;
  }

  editResultado(resul: ResultadoInterface) {
    this.resultado = { ...resul };
    this.formResultados.patchValue({ ...resul });
    this.formResultados.get("puntos")?.removeValidators(Validators.required);
    this.formResultados.get("goles_favor")?.removeValidators(Validators.required);
    this.formResultados.get("goles_contra")?.removeValidators(Validators.required);
    this.formResultados.get("id_equipo_disciplina")?.removeValidators(Validators.required);
    this.formResultados.get("id_partido")?.removeValidators(Validators.required);
 
    this.resultadoDialog = true;
  }

  deleteSelectedResultados() {
    this.deleteResultadosDialog = true;
  }

  deleteResultado(resul: ResultadoInterface) {
    this.deleteResultadoDialog = true;
    this.resultado = { ...resul };
  }

  confirmDeleteSelected() {
    this.deleteResultadosDialog = false;
    this.submitted = true;

    this.resultadoService.deleteSelectResultado(this.selectedResultado.map((u) => u.id))
      .subscribe({
        next: (res) => {
          this.getResultados();
          console.log(res);
          this.successMessage(res.message)
        },
        error: this.errorMessage,
      });

    this.selectedResultado = [];
  }

  confirmDelete() {
    this.deleteResultadoDialog = false;
    this.submitted = true;

    this.resultadoService.deleteResultado(this.resultado.id)
    .subscribe({
      next: (res) => {
        this.getResultados();
        console.log(res);
        this.successMessage(res.message)
      },
      error: this.errorMessage,
    });
    

    this.resultado = {};
  }

  hideDialog() {
    this.resultadoDialog = false;
    this.submitted = false;
    if(this.isUpdate==true){
      this.formResultados.reset()
      this.isUpdate=false
    }
  }

  saveResultado() {
    if (!this.formResultados.valid) {
      this.formResultados.markAllAsTouched();
      return;
    }

    this.submitted = true;
    const values = { ...this.formResultados.value };
    if (!this.resultado.id) {
      this.storeResultados(values);
    } else {
      this.updateResultado(values);
    }
    this.hideDialog();
    this.resultado = {};
  }

  storeResultados(values: any) {
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });

    this.resultadoService.saveResultado(data).subscribe({
      next: (res) => {
        this.getResultados();
        console.log(res);
         this.successMessage(res.message)
      },
      error: this.errorMessage,
    });
  }

  updateResultado(values: any) {
    let data = {
      puntos: values.puntos,
      goles_favor: values.goles_favor,
      goles_contra: values.goles_contra,
      id_equipo_disciplina: values.id_equipo_disciplina,
      id_partido: values.id_partido,
    };

    this.resultadoService.updateResultado(data, this.resultado.id).subscribe({
      next: (res) => {
        this.getResultados();
        console.log(res);
        this.successMessage(res.message);
      },
      error: this.errorMessage,
    });
  }

  getEquipoDisciplina() {
    this.resultadoService.getEquipoDisciplina().subscribe({
      next: (value) => {
          this.equipo_disciplinas = value;
      },
      error: (err) => {
          console.log(err);
      }
  });
}

getPartido() {
  this.resultadoService.getPartido().subscribe({
    next: (value) => {
        this.partidos = value;
    },
    error: (err) => {
        console.log(err);
    }
});
}


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  

}
