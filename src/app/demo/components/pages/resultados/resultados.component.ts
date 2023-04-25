import { ResultadoInterface } from './resultados.interface';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoService } from 'src/app/demo/service/resultado.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  providers: [MessageService]
})
export class ResultadosComponent {
  submitted: boolean = false;

  resultadoDialog: boolean = false;

  deleteResultadoDialog: boolean = false;
  
  deleteResultadosDialog: boolean = false;

  resultados: ResultadoInterface[] = [];
  resultado: ResultadoInterface = {};

  selectedResultado: ResultadoInterface[] = [];

  formResultados: FormGroup;

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

  ngOnInit(){
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

  deleteJugadores(resul: ResultadoInterface) {
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

  

}
