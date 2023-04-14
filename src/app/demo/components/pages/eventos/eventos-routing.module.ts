import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './eventos.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component:EventosComponent}
  ])],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
