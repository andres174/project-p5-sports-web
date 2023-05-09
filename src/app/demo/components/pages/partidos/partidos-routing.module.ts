import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartidosComponent } from './partidos.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'',component:PartidosComponent},
  ])],
  exports: [RouterModule]
})
export class PartidosRoutingModule { }
