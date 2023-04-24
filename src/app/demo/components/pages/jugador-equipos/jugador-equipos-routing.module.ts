import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JugadorEquiposComponent } from "./jugador-equipos.component";

const routes: Routes = [
  {
    path: "",
    component: JugadorEquiposComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadorEquiposRoutingModule {}
