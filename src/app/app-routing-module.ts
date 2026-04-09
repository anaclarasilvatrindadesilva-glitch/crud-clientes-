import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Menu } from './componentes/menu/menu';
import { Clientes } from './pages/clientes/clientes';


const routes: Routes = [
  // 2 - Criar regra de rota para página de login
  {path: 'login', component: Login},
  {path: '', component: Login},
  {path: 'home', component: Home},
  {path: 'menu', component: Menu},
  {path: 'clientes', component: Clientes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
