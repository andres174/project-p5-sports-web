import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EquiposJugadoresComponent } from "./equipos-jugadores.component";

const routes: Routes = [
  {
    path: "",
    component: EquiposJugadoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposJugadoresRoutingModule {}
