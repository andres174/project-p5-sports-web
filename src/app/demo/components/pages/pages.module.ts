import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./pages-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EventosComponent } from './eventos/eventos.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
 
  
    EventosComponent
  ],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
