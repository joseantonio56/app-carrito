import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as emailjs from '@emailjs/browser';


export interface ComentarioDTO {
  mensaje: string;
  status: string;
  data?: any; // Opcional, para el backend
}

export interface Comentario {
  id?: number; // el backend usa Long
  nombre: string;
  email: string;
  mensaje: string;
  fechaCreacion: string;  // fecha como string (ISO) desde backend
}

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl = 'http://localhost:9000/api/comentarios';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  crearComentario(comentario: Comentario): Observable<ComentarioDTO> {
    return this.http.post<ComentarioDTO>(this.apiUrl, comentario);
  }

  obtenerComentarios(): Observable<Comentario[]> {
    // Cambié el tipo a Observable<Comentario[]> para que sea más claro
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  eliminarComentario(id: number): Observable<ComentarioDTO> {
    return this.http.delete<ComentarioDTO>(`${this.apiUrl}/${id}`);
  }

  enviarComentarioEmail(nombre: string, email: string, mensaje: string): Promise<any> {
    const templateParams = { from_name: nombre, from_email: email, message: mensaje };

    return emailjs.send('service_sdg10vf', 'comentario_template', templateParams, 'Vug49q8ZK-26ctwl3')
      .then((response: { status: any; text: any; }) => {
        console.log('Correo enviado', response.status, response.text);
        this.toastr.success('Tu comentario ha sido enviado', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      })
      .catch((error: any) => {
        console.error('Error al enviar correo', error);
        this.toastr.error('No se pudo enviar el comentario', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      });
  }
}
