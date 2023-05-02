import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventoDropdownComponent } from "./evento-dropdown.component";
import { GenericDropdownModule } from "../generic-dropdown/generic-dropdown.module";

@NgModule({
  declarations: [EventoDropdownComponent],
  imports: [CommonModule, GenericDropdownModule],
  exports: [EventoDropdownComponent],
})
export class EventoDropdownModule {}
