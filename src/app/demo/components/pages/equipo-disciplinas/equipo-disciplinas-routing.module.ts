import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EquipoDisciplinasComponent } from "./equipo-disciplinas.component";

const routes: Routes = [
  {
    path: "",
    component: EquipoDisciplinasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoDisciplinasRoutingModule {}
