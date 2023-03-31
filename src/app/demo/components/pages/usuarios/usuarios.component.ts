import { UsuariosService } from "src/app/demo/service/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { UsuarioInterface } from "src/app/demo/api/usuario.interface";
import { environment } from "src/environments/environment";
import { Observer } from "rxjs";

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

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService
  ) {}

  private usuariosObserver: Observer<any> = {
    next: (res) => {
      console.log(res);
      this.getOrganizadores();
      this.messageService.add({
        severity: "success",
        summary: "Acción exitosa",
        detail: res.message,
        life: 3000,
      });
    },
    error: (err) => console.log(err),
    complete: () => {},
  };

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

    this.selectedUsers.forEach((u) =>
      this.usuariosService.deleteUsuario(u.id).subscribe(this.usuariosObserver)
    );

    this.selectedUsers = [];
  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this.usuariosService
      .deleteUsuario(this.user.id)
      .subscribe(this.usuariosObserver);
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
}
