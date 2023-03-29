import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginablancaComponent } from './paginablanca.component';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: PaginablancaComponent }
	])],
  exports: [RouterModule]
})
export class PaginablancaRoutingModule { }
