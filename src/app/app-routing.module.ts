import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mapas',
    loadChildren: () =>
      import('./mapas/mapas.module').then((m) => m.MapasModule),
  },
  {
    path: '**',
    redirectTo: 'mapas',
  },
];
// ¡¡¡¡¡LAZYLOAD!!!!!
// path/cuando alguien entre a la ruta "mapas", loadChildren/ carga a sus hijos y esos hijos
// van a ser producto de import "('./paises/paises.module')", then/promesa/entonces cuando
// los hijos esten cargados en memoria, cuando se cumpla la promesa devuelveme el "mapasModule"
// tuviste duda de porque "m.PaisesModule"? R: porque mapas.module.ts ya esta cargada con las rutas de "mapas-routing.module.ts"
// explicacion de Lazy Load: https://www.youtube.com/watch?v=P3YUzXfa_FI

// rutas padres del modulo

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
