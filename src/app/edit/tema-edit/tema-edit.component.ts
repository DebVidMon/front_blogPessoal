import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/model/Tema';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(private temaService: TemaService, private router: Router, private aRoute: ActivatedRoute) { }

  ngOnInit() {
    if( environment.token == "") {
      alert("Sua sessão expirou. Entre novamente.")
      this.router.navigate(["/entrar"])
    }

      let id = this.aRoute.snapshot.params['id']
      this.findByIdTema(id)
  }

  findByIdTema(id:number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  editar(){
    this.temaService.editTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert("Tema editado com sucesso!")
      this.router.navigate(["/tema"])
    })
  }
}
