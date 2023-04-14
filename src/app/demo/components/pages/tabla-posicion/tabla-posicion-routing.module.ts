import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaPosicionComponent } from './tabla-posicion.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([ 
    {path:'', component: TablaPosicionComponent}
  ])],
  exports: [RouterModule]
})
export class TablaPosicionRoutingModule { }
