import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosComponent } from './resultados.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:ResultadosComponent}
  ])],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
