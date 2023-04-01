import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './configuracion.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:ConfiguracionComponent}
  ])], 
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
