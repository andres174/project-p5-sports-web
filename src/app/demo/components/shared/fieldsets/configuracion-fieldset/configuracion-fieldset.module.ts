import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfiguracionFieldsetComponent } from "./configuracion-fieldset.component";
import { FieldsetModule } from "primeng/fieldset";

@NgModule({
  declarations: [ConfiguracionFieldsetComponent],
  imports: [CommonModule, FieldsetModule],
  exports: [ConfiguracionFieldsetComponent],
})
export class ConfiguracionFieldsetModule {}
