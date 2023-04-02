import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { LoginService } from 'src/app/demo/service/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements  OnInit {

    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;

    constructor(public layoutService: LayoutService,
        private login_service: LoginService) { }

    ngOnInit(): void {
        
    }

    login(){
        console.log(this.password, this.email);

        let data = {
            email: this.email,
            password: this.password
        }

        this.login_service.login(data).subscribe({
            next: (res) => {
                console.log(res);
                localStorage.setItem('id', res.id.toString());
                localStorage.setItem('typeUserId', res.typeUserId.toString());
                localStorage.setItem('user', res.userName);
                localStorage.setItem('email', res.email);
                localStorage.setItem('token', res.accesToken);
                localStorage.setItem('rol', res.rol);
            },
            error: (err) => {
                console.log(err);
            }
        });

        /* 
            En este componente hace falta revisar bien el tema de las rutas y demas detalles
            No esta terminado en su totalidad, ni sus funcionalidades ni su diseño
        */
    }
}
