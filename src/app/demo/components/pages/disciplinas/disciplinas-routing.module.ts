import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinasComponent } from './disciplinas.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'', component: DisciplinasComponent}
  ])],
  exports: [RouterModule]
})
export class DisciplinasRoutingModule { }
