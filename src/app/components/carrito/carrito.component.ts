import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: Producto[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carrito = this.carritoService.getCarrito();
    this.total = this.carritoService.calcularTotal();
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
    this.toastr.info('Producto eliminado del carrito', 'Eliminado', {
      timeOut: 2000,
      positionClass: 'toast-top-center'
    });
    this.cargarCarrito();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.toastr.warning('Carrito vaciado', 'Atención', {
      timeOut: 2000,
      positionClass: 'toast-top-center'
    });
    this.cargarCarrito();
  }
}

