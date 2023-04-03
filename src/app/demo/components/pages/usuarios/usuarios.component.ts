import { UsuariosService } from "src/app/demo/service/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { UsuarioInterface } from "src/app/demo/api/usuario.interface";
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

  users: UsuarioInterface[] = [];
  user: UsuarioInterface = {};
  selectedUsers: UsuarioInterface[] = [];

  submitted: boolean = false;

  userForm: FormGroup;

  selectedImageSrc: string = "";
  selectedImageFile: File | any;

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
          // Validators.required,
          Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),
          Validators.minLength(2),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(8)]],
    });
    console.log(this.userForm.get("nombre")?.errors);

    this.openNew();
  }

  getOrganizadores() {
    this.usuariosService.mostrarOrganizadores().subscribe({
      next: (res) => {
        this.users = res;
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
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: UsuarioInterface) {
    this.user = { ...user };
    this.userForm.patchValue({ ...user });
    this.userForm.controls["password"].setValue("");
    this.userForm.get("password")?.removeValidators(Validators.required);

    this.clearSelectedImage();
    // console.log(user);
    // console.log(this.userForm);
    this.userDialog = true;
  }

  getUserImage(user: UsuarioInterface) {
    if (user.foto_perfil)
      return `${environment.userUrl}${user.id}/${user.foto_perfil}`;
    else return "";
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  deleteUser(user: UsuarioInterface) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }

  confirmDeleteSelected() {
    this.deleteUsersDialog = false;

    this.usuariosService
      .deleteUsuarios(this.selectedUsers.map((u) => u.id))
      .subscribe({
        next: console.log,
        error: console.log,
        complete: () => {
          this.getOrganizadores();
          this.successMessage("Organizadores Eliminados");
        },
      });

    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this.usuariosService.deleteUsuario(this.user.id).subscribe({
      next: console.log,
      error: console.log,
      complete: () => {
        this.getOrganizadores();
        this.successMessage("Organizador Eliminado");
      },
    });
    this.user = {};
  }

  hideDialog() {
    this.userDialog = false;
    this.clearSelectedImage();
    this.submitted = false;
  }

  saveUser() {}

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
    reader.onloadend = (e: any) =>
      (this.selectedImageSrc = e.currentTarget.result);
    reader.readAsDataURL(this.selectedImageFile);
  }

  onImageClear() {
    this.clearSelectedImage();
  }
}
