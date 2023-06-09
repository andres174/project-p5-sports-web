import { UsuariosService } from "src/app/demo/service/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { Usuario } from "src/app/demo/api/usuario.interface";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss"],
  providers: [MessageService],
})
export class UsuariosComponent implements OnInit {
  userDialog: boolean = false;
  deleteUserDialog: boolean = false;
  deleteUsersDialog: boolean = false;

  users: Usuario[] = [];
  user: Usuario = {};
  selectedUsers: Usuario[] = [];

  userForm: FormGroup;

  selectedImageSrc: string = "";
  selectedImageFile: File | any;

  loading: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      nombre: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),
          Validators.minLength(2),
        ],
      ],
      apellido: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),
          Validators.minLength(2),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  getOrganizadores() {
    this.loading = true;
    this.usuariosService.mostrarOrganizadores().subscribe({
      next: (res: Usuario[]) => {
        this.users = res.map((u) => {
          u.foto_perfil &&= `${environment.userUrl}${u.id}/${u.foto_perfil}`;
          return u;
        });
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage("Error interno del servidor");
      },
    });
  }

  ngOnInit() {
    this.getOrganizadores();
  }

  successMessage(msg: string) {
    this.messageService.add({
      severity: "success",
      summary: "Acción exitosa",
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
    this.userForm.reset();
    this.userForm.get("password")?.addValidators(Validators.required);
    this.user = {};
    this.userDialog = true;
  }

  editUser(user: Usuario) {
    this.user = { ...user };
    this.userForm.patchValue({ ...user });
    this.userForm.controls["password"].setValue("");
    this.userForm.get("password")?.removeValidators(Validators.required);

    this.clearSelectedImage();
    // console.log(user);
    // console.log(this.userForm);
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  deleteUser(user: Usuario) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }

  confirmDeleteSelected() {
    this.deleteUsersDialog = false;
    this.loading = true;

    this.usuariosService
      .deleteSelectedUsuarios(this.selectedUsers.map((u) => u.id))
      .subscribe({
        next: (res) => {
          this.getOrganizadores();
          // console.log(res);
          this.successMessage("Organizadores Eliminados");
        },
        error: (err) => {
          console.log(err);
          this.errorMessage(err.error.message);
        },
      });

    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this.loading = true;

    this.usuariosService.deleteUsuario(this.user.id).subscribe({
      next: (res) => {
        this.getOrganizadores();
        this.successMessage("Organizador Eliminado");
      },
      error: (err) => {
        console.log(err);
        this.errorMessage(err.error.message);
      },
    });

    this.user = {};
  }

  hideDialog() {
    this.userDialog = false;
    this.clearSelectedImage();
  }

  saveUser() {
    // Recortar los valores del formulario
    Object.keys(this.userForm.value).map((key) => {
      if (typeof this.userForm.value[key] === 'string') {
        this.userForm.controls[key].setValue(this.userForm.value[key].trim())
      }
    });

    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const values = { ...this.userForm.value };

    if (!this.user.id) {
      // crear
      this.storeUser(values);
    } else {
      // editar
      this.updateUser(values);
    }

    this.hideDialog();
    this.user = {};
  }

  storeUser(values: any) {
    const data = new FormData();

    // Pasar los valores a un FormData
    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });

    if (this.selectedImageFile) {
      data.append("foto_perfil", this.selectedImageFile);
    }

    this.usuariosService.guardarUsuario(data).subscribe({
      next: (res) => {
        this.getOrganizadores();
        console.log(res);
        this.successMessage("Organizador Creado");
      },
      error: (err) => {
        console.log(err);
        this.errorMessage(err.error.message);
      },
    });
  }

  updateUser(values: any) {
    if (this.selectedImageFile) {
      const imageData = new FormData();
      imageData.append("foto_perfil", this.selectedImageFile);
      this.usuariosService
        .updateFotoPerfilUsuario(imageData, this.user.id)
        .subscribe({
          next: console.log,
          error: console.log,
        });
    }

    const data = { ...values };

    // Si no se cambio el email, se envia un null
    if (values.email.trim() === this.user.email?.trim()) {
      data.email = null;
    }

    this.usuariosService.updateUsuario(data, this.user.id).subscribe({
      next: (res) => {
        this.getOrganizadores();
        this.successMessage("Organizador Actualizado");
      },
      error: (err) => {
        console.log(err);
        this.errorMessage(err.error.message);
      },
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
