import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComentariosService } from 'src/app/service/comentario.service';
import { Comentario } from 'src/app/service/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {

  nombre: string = '';
  email: string = '';
  mensaje: string = '';

  constructor(
    private comentariosService: ComentariosService,
    private toastr: ToastrService
  ) { }

  enviarComentario(): void {
    if (!this.nombre || !this.email || !this.mensaje) {
      this.toastr.warning('Por favor completa todos los campos', 'Validación');
      return;
    }

    const nuevoComentario: Comentario = {
      nombre: this.nombre,
      email: this.email,
      mensaje: this.mensaje,
      fechaCreacion: ''
    };

    this.comentariosService.crearComentario(nuevoComentario).subscribe({
      next: (res) => {
        this.toastr.success('Comentario enviado correctamente', 'Éxito');
        // Limpiar campos solo si todo fue bien
        this.nombre = '';
        this.email = '';
        this.mensaje = '';
      },
      error: (err) => {
        console.error('Error al crear comentario', err);
        this.toastr.error('No se pudo enviar el comentario', 'Error');
      }
    });
  }
}
