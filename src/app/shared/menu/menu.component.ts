import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullScreen',
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range',
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores',
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades',
    },
  ];
  // esto se creo en parte para reducir el html, de tal manera  que duplicamos los elementos li con ngfor, y en cada li
  // mostramos la propiedad nombre de aqui arriba, y los mandamos ala ruta con routerlink con la propiedad "ruta"de aqui arriba de igual manera
}
