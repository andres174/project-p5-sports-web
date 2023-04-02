import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadoresComponent } from './jugadores.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([ 
    {path:'', component: JugadoresComponent}
  ])],
  exports: [RouterModule]
})
export class JugadoresRoutingModule { }
