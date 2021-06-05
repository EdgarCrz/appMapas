import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }
      .row {
        position: fixed;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        background-color: white;
        z-index: 999;
        width: 300px;
        height: 100px;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  // con @ViewChild podemos acceder por referencia a los elementos con referencia local # para manipularlos desde el ts
  // En este caso ese valor que traemos se asigna a una propiedad qque declaramos "divMapa" de tipo ElementRef
  // En este caso el tipado "Element Ref" es usado para que aqui podamos acceder a sus propiedades en el DOM
  // como lo podria ser su id, class...etc  ya que "container:" solo admite en este caso valores tipo string o HTMLElement osea elementos del html
  mapa!: mapboxgl.Map;
  zoomLavel: number = 10;
  center: [number, number] = [-99.156952, 19.337123];

  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }
  // empleamos onDestroy para en este caso apagar los listeners, para evitar la duplicidad de escucha de eventos, y evitar que se ejecutan mas procesos
  // recuerta que este ciclo de vida va a ejecutar(en este caso off y puede ejecutar cualquier cosa cuando detecte este ciclo de vida) cuando el elemento htmlse destruya(cuando ya no se muestre en pantalla)
  // basicamente es on:prender eventlistenner  off:apagar eventlistener
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLavel,
      // indicamos que esto va a tener el valor que ya inicializamos arriba en 10
    });
    this.mapa.on('zoom', (ev) => {
      this.zoomLavel = this.mapa.getZoom();
    });
    // on: es un eventListenner/escucha eventos: en este caso va a escuchar 'zoom' cuando  se haga una modificacion en 'zoom'
    // se ejecutara una funcion la cual establecera que el valor de "zoomLavel"  antes 10, ahora sera, lo que nos traiga el getZoom()
    // de esta manera funcionara tanto con los botones asi como con el scroll del mouse
    // zoom:es un evento de mapbox

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
        // 'zoomedn' cuando escuches el evento zoomend/termino del zoom ejecutas lo siguiente
        // zoomTo: lleva el zoom al nivel que le indiquemos
        // zoomend:es un evento de mapbox
      }
    });
    // movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
      console.log(target.getCenter());
    });
    // move: es un evento de mapbox
  }

  zoomOut() {
    this.mapa.zoomOut();
    // nos reduce el zoom
  }
  zoomIn() {
    this.mapa.zoomIn();
  }
  zoomCambio(zoomInput: string) {
    this.mapa.zoomTo(Number(zoomInput));
    // number: basicamente es un convertidor a numeros
  }
}
