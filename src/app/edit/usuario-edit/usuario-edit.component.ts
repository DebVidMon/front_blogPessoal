import { AlertasService } from './../../service/alertas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  user: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipo: string

  constructor(
    private authService: AuthService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private alerta: AlertasService
  ) { }


  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.aRoute.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipo = event.target.value
  }

  atualizar() {
    this.user.tipoUsuario = this.tipo

    if (this.user.senha != this.confirmarSenha) {
      this.alerta.showAlertDanger('A senhas estão incorretas.')
    } else {
      console.log(this.user.id, this.user.nome, this.user.usuario, this.user.senha, this.user.foto, this.user.tipoUsuario)
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        this.alerta.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      }, erro => {
        this.alerta.showAlertDanger('Algo deu errado, tente novamente mais tarde')
     })
    }
  }

  findByIdUser(id: number) {
    this.authService.getUserById(id).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

}
