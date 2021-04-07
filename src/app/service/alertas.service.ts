import { AlertaComponent } from './../alerta/alerta.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService
  ) { }

  private showAlert(msgm:string, tipo:string){
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertaComponent)
    bsModalRef.content.type = tipo
    bsModalRef.content.message = msgm
  }

  showAlertDanger(msgm: string){
    this.showAlert(msgm,'danger')
  }

  showAlertSuccess(msgm: string){
    this.showAlert(msgm,'sucess')
  }

  showAlertWarning(msgm: string){
    this.showAlert(msgm,'warning')
  }
}
