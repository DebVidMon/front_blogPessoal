import { AlertasService } from './../service/alertas.service';
import { Tema } from './../model/Tema';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema= new Tema()
  listaTemas: Tema[]

  constructor( private router:Router, private temaService: TemaService, private alerta: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0)
    if( environment.token == "") {
      this.alerta.showAlertDanger("Sua sessão expirou. Entre novamente.")
      this.router.navigate(["/entrar"])
    }

    this.findAllTemas()
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=> {
      this.tema = resp
      alert("Tema cadastrado com sucesso!")
      this.tema = new Tema
      this.findAllTemas()
    })
  }

  findAllTemas(){
    this.temaService.gelAllTema().subscribe((resp:Tema[])=>{
      this.listaTemas = resp

    })
  }

}
