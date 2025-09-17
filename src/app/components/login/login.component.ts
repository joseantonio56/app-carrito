import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  login() {
    // Validación simple de campos vacíos
    if (!this.email || !this.password) {
      this.toastr.error('Debes completar todos los campos', 'Error');
      return;
    }

    // Validación local sin backend
    if (this.email === 'admin@gmail.com' && this.password === '12345') {
      // Guardar email para simular sesión
      localStorage.setItem('userEmail', this.email);

      this.toastr.success('Login exitoso', 'Éxito');
      this.router.navigate(['/list-comentarios']); // redirige a la lista de comentarios
    } else {
      this.toastr.error('Credenciales incorrectas', 'Error');
    }
  }
}
