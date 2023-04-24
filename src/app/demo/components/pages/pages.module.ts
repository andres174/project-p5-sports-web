import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { PartidosComponent } from './partidos/partidos.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    
  
    PartidosComponent
  ],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
