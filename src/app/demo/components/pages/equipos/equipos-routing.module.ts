import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EquiposComponent } from "./equipos.component";

const routes: Routes = [
  {
    path: "",
    component: EquiposComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposRoutingModule {}
