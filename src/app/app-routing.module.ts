import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  {path:"", redirectTo: "entrar", pathMatch: "full"},
  {path: "entrar", component: EntrarComponent},
  {path:"cadastro", component: CadastroComponent},
  {path: "inicio", component: InicioComponent},
  {path:"tema", component: TemaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
