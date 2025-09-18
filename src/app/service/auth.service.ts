import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9000/api/auth'; // tu endpoint de login en backend

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token'); // o lo que uses para guardar la sesión
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('userEmail');
}

}
/*
Resumen de lo que hicimos hoy:

Configuraste Firebase en tu proyecto.

Arreglamos la estructura de environment.ts.

Activamos correctamente el authGuard.

Revisamos tu auth.service y ajustamos la lógica de login para que funcione con el guard.

Ahora las rutas protegidas como /list-comentarios solo se abren si estás autenticado.

Queda pendiente crear bien los comentarios de firebase para cargar los comentarios.
*/ 
