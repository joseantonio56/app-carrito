import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { ListComentarioComponent } from './components/list-comentario/list-comentario.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/productos', pathMatch: 'full' }, // ruta por defecto
  { path: 'productos', component: ProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  {path:'comentarios',component:ComentariosComponent},
   { path: 'login', component: LoginComponent },
  { path: 'list-comentarios', component: ListComentarioComponent, /*canActivate: [authGuard]*/ },
  { path: '**', redirectTo: '/productos' } // para rutas desconocidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
