import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/service/carrito.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cantidadTotal: number = 0;

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    // Nos suscribimos al observable para actualizar la cantidad en tiempo real
    this.carritoService.cantidad$.subscribe(total => {
      this.cantidadTotal = total;
    });
  }
}
