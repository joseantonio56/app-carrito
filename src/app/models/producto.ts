export class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public precio: number,
    public descripcion: string,
    public imagen: string,
    public cantidad: number = 0 // cantidad para el carrito
  ) {}
}
