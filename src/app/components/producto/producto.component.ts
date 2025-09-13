import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    private carritoService: CarritoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Productos de ejemplo, las imágenes en src/assets/img/
    this.productos = [
      new Producto(1, 'Mermelada Fresas', 4.50, 'Mermelada 100% casera', 'assets/img/mermelada_fresa.jpeg'),
      new Producto(2, 'Mermelada Moras', 10.00, 'Mermelada 100% casera', 'assets/img/mermelada_mora.jpeg'),
      new Producto(3, 'Mermelada Naranjas', 4.50, 'Mermelada 100% casera', 'assets/img/mermelada_naranja.png')
    ];
  }

  agregarAlCarrito(producto: Producto): void {
    // Hacemos una copia para no mutar el catálogo
    const item: any = { ...producto };
    item.cantidad = (item.cantidad ?? 0) + 1;

    this.carritoService.agregarProducto(item);

    // Notificación
    this.toastr.success(`${producto.nombre} agregado al carrito`, 'Añadido', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }
}
