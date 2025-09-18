import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as emailjs from '@emailjs/browser';

export interface ComentarioDTO {
  mensaje: string;
  status: string;
  data?: any;
}

export interface Comentario {
  id?: number;
  nombre: string;
  email: string;
  mensaje: string;
  fechaCreacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private apiUrl = 'http://localhost:9000/api/comentarios';
  private readonly STORAGE_KEY = 'comentariosLocal';
  private modoLocal = true; // Cambia a false para usar backend

  private comentariosLocal: Comentario[] = [];
  private comentariosSubject = new BehaviorSubject<Comentario[]>([]);
  comentarios$ = this.comentariosSubject.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {
    if (this.modoLocal) {
      this.cargarComentariosLocal();
      this.comentariosSubject.next(this.comentariosLocal);
    }
  }

  crearComentario(comentario: Comentario): Observable<ComentarioDTO> {
    if (this.modoLocal) {
      this.agregarComentarioLocal(comentario);
      this.comentariosSubject.next(this.comentariosLocal);
      return of({ mensaje: 'Comentario agregado localmente', status: 'success' });
    }
    return this.http.post<ComentarioDTO>(this.apiUrl, comentario);
  }

  obtenerComentarios(): Observable<Comentario[]> {
    if (this.modoLocal) {
      return this.comentarios$;
    }
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  eliminarComentario(id: number): Observable<ComentarioDTO> {
    if (this.modoLocal) {
      this.eliminarComentarioLocal(id);
      this.comentariosSubject.next(this.comentariosLocal);
      return of({ mensaje: 'Comentario eliminado localmente', status: 'success' });
    }
    return this.http.delete<ComentarioDTO>(`${this.apiUrl}/${id}`);
  }

  private cargarComentariosLocal() {
    const datos = localStorage.getItem(this.STORAGE_KEY);
    if (datos) {
      this.comentariosLocal = JSON.parse(datos).map((c: any) => ({
        ...c,
        fechaCreacion: c.fechaCreacion
      }));
    } else {
      this.comentariosLocal = [];
    }
  }

  private guardarComentariosLocal() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.comentariosLocal));
  }

  private agregarComentarioLocal(comentario: Comentario) {
    comentario.id = this.comentariosLocal.length > 0
      ? Math.max(...this.comentariosLocal.map(c => c.id || 0)) + 1
      : 1;
    if (!comentario.fechaCreacion) {
      comentario.fechaCreacion = new Date().toISOString();
    }
    this.comentariosLocal.unshift(comentario);
    this.guardarComentariosLocal();
  }

  private eliminarComentarioLocal(id?: number) {
    if (id == null) return;
    this.comentariosLocal = this.comentariosLocal.filter(c => c.id !== id);
    this.guardarComentariosLocal();
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
