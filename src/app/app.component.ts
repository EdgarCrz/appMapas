import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    // se hizo la implementacion del token y de la libreria no escrita en angula
    // a un nivel global para que pudiera hacerse uso de ello en los ficheros hijos
  }
  title = 'mapasApp';
}
