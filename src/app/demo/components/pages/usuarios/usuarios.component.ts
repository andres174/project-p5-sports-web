import { UsuariosService } from "src/app/demo/service/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { UsuarioInterface } from "src/app/demo/api/usuario.interface";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup } from "@angular/forms";

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

  uploadedUserImage: any;

  submitted: boolean = false;

  userForm!: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      foto_perfil: [],
      nombre: [],
      apellido: [],
      email: [],
      password: [],
    });
  }

  getOrganizadores() {
    this.usuariosService.getOrganizadores().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
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

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  getUserImage(user: UsuarioInterface) {
    return `${environment.storageUrl}/foto/usuario/${user.id}/${user.foto_perfil}`;
  }

  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  editUser(user: UsuarioInterface) {
    this.user = { ...user };
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
        error: (err) => {
          console.log("error");
        },
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
      next: (res) => {
        console.log(res);
        this.getOrganizadores();
        this.successMessage("Organizador Eliminado");
      },
      error: (err) => console.log(err),
    });
    this.user = {};
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {}

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onUpload(event: any) {
    console.log(event);
    // this.uploadedUserImage = event.files
  }
}
