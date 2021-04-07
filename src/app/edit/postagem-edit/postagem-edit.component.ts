import { AlertasService } from './../../service/alertas.service';
import { TemaService } from './../../service/tema.service';
import { Tema } from './../../model/Tema';

import { PostagemService } from './../../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/model/Postagem';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem
  tema:Tema = new Tema
  listaTemas: Tema[]
  idTema: number

  constructor(private postService: PostagemService, private router: Router, private aRoute: ActivatedRoute,private temaService: TemaService, private alerta: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0)
    if( environment.token == "") {
      this.alerta.showAlertDanger("Sua sessão expirou. Entre novamente.")
      this.router.navigate(["/entrar"])
    }
      let id= this.aRoute.snapshot.params['id']
      this.findPostById(id)
      this.findAllTemas()
  }


  findPostById(id:number){
    this.postService.getById(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.gelAllTema().subscribe((resp:Tema[])=>{
      this.listaTemas = resp
    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postService.putPostagem(this.postagem).subscribe((resp:Postagem)=>{
      this.postagem = resp
      this.alerta.showAlertSuccess("Postagem atualizada com sucesso!")
      this.router.navigate(["/inicio"])
    })
  }

}
