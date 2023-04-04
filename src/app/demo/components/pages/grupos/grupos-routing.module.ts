import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruposComponent } from './grupos.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', 
      component: GruposComponent
    }
  ])],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
