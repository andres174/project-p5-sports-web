import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GenericDropdownComponent } from "./generic-dropdown.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  declarations: [GenericDropdownComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DropdownModule],
  exports: [GenericDropdownComponent],
})
export class GenericDropdownModule {}
