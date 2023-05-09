import { GenericDropdownModule } from "./../generic-dropdown/generic-dropdown.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventoDisciplinaDropdownComponent } from "./evento-disciplina-dropdown.component";

@NgModule({
  declarations: [EventoDisciplinaDropdownComponent],
  imports: [CommonModule, GenericDropdownModule],
  exports: [EventoDisciplinaDropdownComponent],
})
export class EventoDisciplinaDropdownModule {}
