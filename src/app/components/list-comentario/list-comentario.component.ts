import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comentario, ComentariosService, ComentarioDTO } from 'src/app/service/comentario.service';

@Component({
  selector: 'app-list-comentario',
  templateUrl: './list-comentario.component.html',
  styleUrls: ['./list-comentario.component.css']
})
export class ListComentarioComponent implements OnInit {

  comentarios: Comentario[] = [];

  constructor(
    private comentariosService: ComentariosService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.comentariosService.obtenerComentarios().subscribe({
      next: (res: any) => {
        // Ajusta según cómo devuelva tu backend los comentarios
        this.comentarios = res.data || res;
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('No se pudo cargar la lista de comentarios', 'Error');
      }
    });
  }

  eliminarComentario(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este comentario?')) return;

    this.comentariosService.eliminarComentario(id).subscribe({
      next: (res: ComentarioDTO) => {
        this.toastr.success(res.mensaje, 'Éxito');
        this.cargarComentarios(); // recarga la lista después de eliminar
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('No se pudo eliminar el comentario', 'Error');
      }
    });
  }
}
