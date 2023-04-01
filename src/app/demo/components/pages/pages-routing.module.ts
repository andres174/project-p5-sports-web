import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'paginablanca', loadChildren: () => import('./paginablanca/paginablanca.module').then(m => m.PaginablancaModule) },
        {path:  'disciplinas', loadChildren:()=>import('./disciplinas/disciplinas.module').then(m => m.DisciplinasModule) },
        {path:  'configuracion', loadChildren:()=>import('./configuracion/configuracion.module').then(m=>m.ConfiguracionModule)},
        {path: "organizadores",loadChildren: () =>import("./usuarios/usuarios.module").then((m) => m.UsuariosModule),},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }