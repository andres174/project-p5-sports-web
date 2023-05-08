import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss'],
  providers: [MessageService],
})
export class PartidosComponent {
  submitted: boolean = false;
  partidoDialog: boolean = true;
  deletePartidoDialog: boolean = false;
  deletePartidosDialog: boolean = false;
  isUpdate:boolean=false;
  mostrarModalCalendarioInicio:boolean = false;
  mostrarModalCalendario:boolean=false;
  mostrarModalmapa:boolean=false
  cols: any[] = [];
  selectedPartido:[]=[];
  partidos:any;
  idPartido:any;

  margen = {
    'margin-bottom': '10'
}
@ViewChild('map') divMap!:ElementRef ;
  constructor()
  {
  }

  openNew(){
    this.partidoDialog=true;
  }

  editPartido(){

  }

  deletePartido(){

  }

  hideDialog(){

  }
  savePartido(){

  }

  updatePartido(){

  }

  updateDate() {
   
  }

  limpiarFechafin() {
    this.mostrarModalCalendario = false;
   
  }

}
