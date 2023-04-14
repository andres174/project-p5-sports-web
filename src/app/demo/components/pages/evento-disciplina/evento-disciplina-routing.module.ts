import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoDisciplinaComponent } from './evento-disciplina.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', 
      component: EventoDisciplinaComponent
    }
  ])],
  
  exports: [RouterModule]
})
export class EventoDisciplinaRoutingModule { }
