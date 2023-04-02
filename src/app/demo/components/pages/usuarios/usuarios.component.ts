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

  imgUrl: string = environment.userUrl;

  submitted: boolean = false;

  userForm: FormGroup;

  userImageSelectSrc: string = "";
  userImageSelectFile: File | any;

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
          Validators.minLength(4),
        ],
      ],
      apellido: [
        "",
        [
          // Validators.required,
          Validators.pattern(/^[A-ZÀ-ÿ ]+$/i),
          Validators.minLength(4),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(8)]],
    });
  }

  getOrganizadores() {
    this.usuariosService.getOrganizadores().subscribe({
      next: (res) => {
        this.users = res;
        // console.log(this.users);
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
    this.user = {};
    this.submitted = false;
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

  editUser(user: UsuarioInterface) {
    this.user = { ...user };
    this.userForm.patchValue({ ...user });
    this.userForm.controls["password"].setValue("");

    this.clearSelectedImage();

    // console.log(user);
    // console.log(this.userForm);

    this.userDialog = true;
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
    this.userImageSelectSrc = "";
    this.userImageSelectFile = undefined;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onImageSelect(event: any) {
    console.log(event);
    this.userImageSelectFile = event.currentFiles[0];
    if (!this.userImageSelectFile) return;
    const fr = new FileReader();
    fr.onload = (e: any) => (this.userImageSelectSrc = e.currentTarget.result);
    fr.readAsDataURL(this.userImageSelectFile);
  }

  onImageClear() {
    this.clearSelectedImage();
  }
}
