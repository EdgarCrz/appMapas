import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
// esta fue una "adaptacion"  ya que por defauld las instrucciones son para js un tanto diferentes para ts aunque en teoria es lo mismo

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class FullScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.156952, 19.337123],
      zoom: 18,
    });
    // mapboxgl.accessToken = 'pk.eyJ1IjoiZWRnYXJjcnoiLCJhIjoiY2twOTdhZW11MGVwZzJ2b2Y1Z2JicnhhdCJ9.3VmnpaLdOoXUomcdV5NQig';
    // var map = new mapboxgl.Map({
    //   container: 'YOUR_CONTAINER_ELEMENT_ID',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    // });

    // en este caso tambien se hizo una leve modificacion nada muy dificil
    // de ahi en fuera solo creamos un div en html donde mostrariamos el mapa, y solo lo conectamos con nuestra api por medio de el id del elemento
  }
}
