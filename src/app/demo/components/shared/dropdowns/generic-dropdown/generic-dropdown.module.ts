import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GenericDropdownComponent } from "./generic-dropdown.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  declarations: [GenericDropdownComponent],
  imports: [CommonModule, FormsModule, DropdownModule],
  exports: [GenericDropdownComponent],
})
export class GenericDropdownModule {}
