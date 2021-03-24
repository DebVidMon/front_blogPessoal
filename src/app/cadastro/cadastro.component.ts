import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario()
  senha1: string
  tipoUser: string

  constructor( private aService: AuthService, private router:Router) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmaSenha(event:any){
    this.senha1 = event.target.value
  }

  tipo(event:any){
    this.tipoUser = event.target.value
  }

  cadastrar(){
    this.usuario.tipoUsuario = this.tipoUser

    if(this.usuario.senha != this.senha1){
      alert("As senhas não são iguais")
    }else{
      this.aService.cadastrar(this.usuario).subscribe((resp: Usuario)=>{
         this.usuario=resp
         this.router.navigate(["/entrar"])
         alert("Usuário cadastrado com sucesso")
      })
    }
  }
}
