import { AlertasService } from './../../service/alertas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/model/Tema';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema:Tema = new Tema()
  idT:number

  constructor(private temaService:TemaService, private router:Router, private aRoute: ActivatedRoute,
    private alerta: AlertasService) { }

  ngOnInit(){
    if( environment.token == "") {
      this.alerta.showAlertDanger("Sua sessão expirou. Entre novamente.")
      this.router.navigate(["/entrar"])
    }

    this.idT = this.aRoute.snapshot.params['id']
      this.findByIdTema(this.idT)
  }

  findByIdTema(id:number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar(){
    this.temaService.deleteTema(this.idT).subscribe(()=>{
      this.alerta.showAlertWarning("Tema e postagens apagados com sucesso")
      this.router.navigate(["/tema"])
    })
  }
}
