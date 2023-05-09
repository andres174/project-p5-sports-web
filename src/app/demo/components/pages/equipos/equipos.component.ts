import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { EquiposService } from "src/app/demo/service/equipos.service";
import { Equipo } from "../../../api/equipo.interface";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-equipos",
  templateUrl: "./equipos.component.html",
  styleUrls: ["./equipos.component.scss"],
  providers: [MessageService],
})
export class EquiposComponent implements OnInit {
  equipoDialog: boolean = false;
  deleteEquipoDialog: boolean = false;
  deleteEquiposDialog: boolean = false;

  equipos: Equipo[] = [];
  equipo: Equipo = {};
  selectedEquipos: Equipo[] = [];

  equipoForm: FormGroup;

  selectedImageSrc: string = "";
  selectedImageFile: File | any;

  loading: boolean = false;

  constructor(
    private equiposService: EquiposService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.equipoForm = this.fb.group({
      nombre: [
        "",
        [
          Validators.required,
          // Validators.pattern(/^[A-ZÀ-ÿ -]+$/i),
          Validators.minLength(3),
        ],
      ],
    });
  }

  getEquipos() {
    this.loading = true;
    this.equiposService.getEquipos().subscribe({
      next: (res: Equipo[]) => {
        this.equipos = res.map((eq) => {
          eq.logo &&= `${environment.equipoUrl}${eq.id}/${eq.logo}`;
          return eq;
        });
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage("Error interno del servidor");
      },
    });
  }

  ngOnInit(): void {
    this.getEquipos();
  }

  successMessage(msg: string) {
    this.messageService.add({
      severity: "success",
      summary: "Acción exitosa",
      detail: msg,
      life: 3000,
    });
  }

  infoMessage(msg: string) {
    this.messageService.add({
      severity: "info",
      summary: "Información",
      detail: msg,
      life: 3000,
    });
  }

  errorMessage(msg: string) {
    this.messageService.add({
      severity: "error",
      summary: "Ocurrio un Error",
      detail: msg,
      life: 3000,
    });
  }

  openNew() {
    this.equipoForm.reset();
    this.equipo = {};
    this.equipoDialog = true;
  }

  editEquipo(equipo: Equipo) {
    this.equipo = { ...equipo };
    this.equipoForm.patchValue({ ...equipo });
    this.clearSelectedImage();
    this.equipoDialog = true;
  }

  deleteSelectedEquipos() {
    this.deleteEquiposDialog = true;
  }

  deleteEquipo(equipo: Equipo) {
    this.deleteEquipoDialog = true;
    this.equipo = { ...equipo };
  }

  confirmDeleteSelected() {
    this.deleteEquiposDialog = false;
    this.loading = true;

    this.equiposService
      .deleteSelectedEquipos(this.selectedEquipos.map((eq) => eq.id))
      .subscribe({
        next: (res) => {
          this.getEquipos();
          this.successMessage(res.message);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage(err.error.message);
        },
      });

    this.selectedEquipos = [];
  }

  confirmDelete() {
    this.deleteEquipoDialog = false;
    this.loading = true;

    this.equiposService.deleteEquipo(this.equipo.id).subscribe({
      next: (res) => {
        this.getEquipos();
        this.successMessage(res.message);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage(err.error.message);
      },
    });

    this.equipo = {};
  }

  hideDialog() {
    this.equipoDialog = false;
    this.clearSelectedImage();
  }

  saveEquipo() {
    // Recortar los valores del formulario
    Object.keys(this.equipoForm.value).map((key) => {
      if (typeof this.equipoForm.value[key] === "string") {
        this.equipoForm.controls[key].setValue(
          this.equipoForm.value[key].trim()
        );
      }
    });

    if (!this.equipoForm.valid) {
      this.equipoForm.markAllAsTouched();
      return;
    }

    // Si falta foto al momento de crear equipo
    if (!this.equipo.id && !this.selectedImageFile) {
      this.infoMessage("Escoga un logo para el Equipo");
      return;
    }

    this.loading = true;
    const values = { ...this.equipoForm.value };

    if (!this.equipo.id) {
      this.storeEquipo(values);
    } else {
      this.updateEquipo(values);
    }

    this.hideDialog();
    this.equipo = {};
  }

  storeEquipo(values: any) {
    const data = new FormData();

    data.append("nombre", values.nombre);
    data.append("logo", this.selectedImageFile);

    this.equiposService.storeEquipo(data).subscribe({
      next: (res) => {
        this.getEquipos();
        this.successMessage(res.message);
      },
      error: console.log,
    });
  }

  updateEquipo(values: any) {
    if (this.selectedImageFile) {
      const imageData = new FormData();
      imageData.append("logo", this.selectedImageFile);
      this.equiposService
        .updateLogoEquipo(imageData, this.equipo.id)
        .subscribe({
          next: console.log,
          error: console.log,
        });
    }

    const data = { ...values };

    this.equiposService.updateEquipo(data, this.equipo.id).subscribe({
      next: (res) => {
        this.getEquipos();
        this.successMessage(res.message);
      },
      error: console.log,
    });
  }

  clearSelectedImage() {
    this.selectedImageSrc = "";
    this.selectedImageFile = undefined;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onImageSelect(event: any) {
    this.selectedImageFile = event.files[0];
    if (!this.selectedImageFile) return;
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      this.selectedImageSrc = e.currentTarget.result;
    };
    reader.readAsDataURL(this.selectedImageFile);
  }

  onImageClear() {
    this.clearSelectedImage();
  }
}
