import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/service/carrito.service';
import { ComentariosService } from 'src/app/service/comentario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cantidadTotal: number = 0; // carrito
  cantidadComentarios: number = 0; // comentarios

  constructor(
    private carritoService: CarritoService,
    private comentariosService: ComentariosService
  ) { }

  ngOnInit(): void {
    // Suscripción para carrito
    this.carritoService.cantidad$.subscribe(total => {
      this.cantidadTotal = total;
    });

    // Suscripción para comentarios
    this.cargarCantidadComentarios();
  }

  cargarCantidadComentarios() {
    this.comentariosService.obtenerComentarios().subscribe((comentarios: string | any[]) => {
      this.cantidadComentarios = comentarios.length;
    });
  }
}
