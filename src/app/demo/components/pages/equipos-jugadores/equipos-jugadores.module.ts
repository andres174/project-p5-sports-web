import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EquiposJugadoresRoutingModule } from "./equipos-jugadores-routing.module";
import { EquiposJugadoresComponent } from "./equipos-jugadores.component";

@NgModule({
  declarations: [EquiposJugadoresComponent],
  imports: [CommonModule, EquiposJugadoresRoutingModule],
})
export class EquiposJugadoresModule {}
