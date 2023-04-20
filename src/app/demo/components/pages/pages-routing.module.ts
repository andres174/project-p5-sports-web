import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'paginablanca', loadChildren: () => import('./paginablanca/paginablanca.module').then(m => m.PaginablancaModule) },
        { path: 'disciplinas', loadChildren: () => import('./disciplinas/disciplinas.module').then(m => m.DisciplinasModule) },
        { path: 'configuracion', loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule) },
        { path: "organizadores", loadChildren: () => import("./usuarios/usuarios.module").then((m) => m.UsuariosModule), },
        { path: "jugadores", loadChildren: () => import("./jugadores/jugadores.module").then((m) => m.JugadoresModule), },
        { path: "posiciones", loadChildren: () => import("./posiciones/posiciones.module").then((m) => m.PosicionesModule), },
        { path: "grupos", loadChildren: () => import("./grupos/grupos.module").then((m) => m.GruposModule), },
        { path: "eventos", loadChildren: () => import("./eventos/eventos.module").then((m) => m.EventosModule), },
        { path: "evento-disciplina", loadChildren: () => import("./evento-disciplina/evento-disciplina.module").then((m) => m.EventoDisciplinaModule), },
        { path: "equipos", loadChildren: () => import("./equipos/equipos.module").then((m) => m.EquiposModule), },
        { path: "tabla-posicion", loadChildren: () => import("./tabla-posicion/tabla-posicion.module").then((m) => m.TablaPosicionModule), },
        { path: "jugador-equipos", loadChildren: () => import("./jugador-equipos/jugador-equipos.module").then((m) => m.JugadorEquiposModule), },
        { path: "resultados", loadChildren: () => import("./resultados/resultados.module").then((m) => m.ResultadosModule), },
        { path: '**', redirectTo: '/notfound' }

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }