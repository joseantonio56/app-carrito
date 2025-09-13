import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private storageKey = 'carrito';

  // Observable para la cantidad total del carrito
  private cantidadSubject = new BehaviorSubject<number>(0);
  cantidad$ = this.cantidadSubject.asObservable();

  constructor() {
    this.actualizarCantidad();
  }

  getCarrito(): Producto[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private guardarCarrito(carrito: Producto[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(carrito));
    this.actualizarCantidad();
  }

  agregarProducto(producto: Producto): void {
    const carrito = this.getCarrito();
    const item = carrito.find(p => p.id === producto.id);

    if (item) {
      item.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    this.guardarCarrito(carrito);
  }

  eliminarProducto(id: number): void {
    const carrito = this.getCarrito().filter(p => p.id !== id);
    this.guardarCarrito(carrito);
  }

  vaciarCarrito(): void {
    localStorage.removeItem(this.storageKey);
    this.actualizarCantidad();
  }

  calcularTotal(): number {
    return this.getCarrito().reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  }

  private actualizarCantidad(): void {
    const total = this.getCarrito().reduce((acc, p) => acc + p.cantidad, 0);
    this.cantidadSubject.next(total);
  }
}

