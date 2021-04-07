import { AlertasService } from './../../service/alertas.service';
import { Postagem } from './../../model/Postagem';
import { Router, ActivatedRoute } from '@angular/router';
import { PostagemService } from './../../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {
  postagem:Postagem = new Postagem
  idPost:number
  constructor(private postService: PostagemService, private router: Router, private aRoute: ActivatedRoute,
    private alerta: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0)
    if( environment.token == "") {
      this.alerta.showAlertDanger("Sua sessão expirou. Entre novamente.")
      this.router.navigate(["/entrar"])

      this.idPost= this.aRoute.snapshot.params['id']
    }
  }

  findPostById(id:number){
    this.postService.getById(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  apagar(){
    this.postagem.id = this.idPost
    this.postService.deletePostagem(this.idPost).subscribe(()=>{
      this.alerta.showAlertWarning("Postagem apagada com sucesso!")
      this.router.navigate(["/inicio"])
    })
  }
}
