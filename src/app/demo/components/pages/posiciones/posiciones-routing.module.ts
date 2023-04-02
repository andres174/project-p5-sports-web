import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosicionesComponent } from './posiciones.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: PosicionesComponent}
  ])],
  exports: [RouterModule]
})
export class PosicionesRoutingModule { }
