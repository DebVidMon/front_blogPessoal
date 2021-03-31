import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem:Postagem = new Postagem()
  listaPosts: Postagem[]
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  usuario: Usuario = new Usuario()
  idUser= environment.id

  constructor(private router: Router, private postagemService:PostagemService,private temaService: TemaService, private authService: AuthService) { }

  ngOnInit() {

    if( environment.token == "") {
      alert("Sua sessão expirou. Entre novamente.")
      this.router.navigate(["/entrar"])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

    getAllTemas(){
      this.temaService.gelAllTema().subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }

    findByIdTema(){
      this.temaService.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
        this.tema = resp
      })
    }

    publicar(){
      this.tema.id = this.idTema
      this.postagem.tema = this.tema

      this.usuario.id = this.idUser
      this.postagem.usuario = this.usuario

      this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem)=>{
        this.postagem=resp
        alert("Postagem realizada com sucesso!")
        this.postagem = new Postagem()
        this.getAllPostagens()
      })

    }

    getAllPostagens(){
      this.postagemService.getAllPostagens().subscribe((resp:Postagem[])=>{
        this.listaPosts = resp
      })
    }

    findUserById(){
      this.authService.getUserById(this.idUser).subscribe((resp:Usuario)=>{
        this.usuario = resp
      })
    }

}
