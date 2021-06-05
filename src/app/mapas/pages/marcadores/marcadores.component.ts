import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}
//  los ultimos son opcionales en dado caso de que no los ocupe cuando utilize este tipado

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 20;
      }
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLavel: number = 10;
  center: [number, number] = [-99.156952, 19.337123];
  marcadores: MarcadorColor[] = [];
  // hacemos la vinculacion con elemento html donde se mostrara
  // establecemos una variable con el numero de zoom inicial
  // declaramos center, con dos valores, que se tomaran como la longitud y latitud para usarla de centro inicial del mapa

  constructor() {}
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLavel,
      // esto es codigo(ya tuneado) que nos da mapbox para implementar sus mapas
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola mundo';

    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
    // agregamos un marcador con metodos propios de mapbox como setLngLat y addTo
    this.leerLocalStorage();
    // despues de que se inicie la ap ejecutara este metodo
  }

  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    console.log(color);
    const nuevoMarcador = new mapboxgl.Marker({ draggable: true, color: color })
      // color:color  esto es redundande, asi que ecma script determina que cuando el nombre de propiedad es igual a una constante, no hace falta igualarlas, asi que podria ponerse solo color
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color: color,
      marker: nuevoMarcador,
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });
    // esto es un eventListenner que escucha cuando termina de arrastrarse un marcador, al termino ejetuca el metodo "guardarMarcadoresLocalStorage()"
  }
  irMarcador(marcador: MarcadorColor) {
    this.mapa.flyTo({
      center: marcador.marker!.getLngLat(),
    });
  }

  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];
    // se crea esta constante que es un arrat de interface Marcador color y se inicia vacio

    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat],
      });
      // usamos foreach para ciclar su contenido, asi mismo cargamos su contenido en las constantes que creamos una de ella fue desestructurada
      // despues añadimos con push al arreglo que se veria algo asi [{color,centro},{color,centro}...]

      localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
      // mandamos al localstorage un item llamado 'marcadores' y el contenido el arreglo de tipo "MarcadorColor", en este caso al
      // localStorage, solo permite strings por ende usamos un metodo de JSON, PARA CONVERTIR a un objeto json perfectamente compatible, ya que son strings lo que contiene
    });
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
      // si no! existe el item "marcadores" entonces no hagas nada
    }
    // en otro caso haz lo siguiente
    const lngLatArr: MarcadorColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );
    // crea otra constante(es muy similar a la de guardar) en este caso ahora la volvemos a transformar a un "MarcadorColor" para eso a la inversa usamos un JSON.parse
    // parseamos lo que se encuentre en el localStorage/getItem:traer ek item "marcadores"
    lngLatArr.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        // para poder construir de nuevo los marcadores, de el arreglo que resulta de cargar los elementos que teniamos en localStorage
        // ya tenemos un array por ende lo podemos volver a recorrer, en este caso en cada vuelta vamos a construir un nuevo marcador
        // y en este caso le damos el color con m.color y le indicamos que pueda ser arrastrado con el draggable
        .setLngLat(m.centro!)
        // mandamos la longitud y latitud(las guardadas antes) para que ubique el centro y como parametro le mandamos
        // m.centro, que contiene la lat y long
        .addTo(this.mapa);
      // añadimos al mapa lo anterior

      this.marcadores.push({
        marker: newMarker,
        color: m.color,
      });
      // repetimos esto de nuevo para que se vuelva a guardar en el arreglo de los marcadores

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });
      // esto es un eventListenner que escucha cuando termina de arrastrarse un marcador, al termino ejetuca el metodo "guardarMarcadoresLocalStorage()"
    });
  }

  borrarMarcador(i: number) {
    console.log('borrando marcador');
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }
}
