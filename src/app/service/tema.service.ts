import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  gelAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>("http://localhost:8080/tema", this.token)
  }

  getByIdTema(id: number):Observable<Tema>{
    return this.http.get<Tema>(`http://localhost:8080/tema/${id}`, this.token)
  }

  getByNomeTema(descricao: string): Observable<Tema[]>{
    return this.http.get<Tema[]>(`http://localhost:8080/tema/nome/${descricao}`, this.token)
  }

  postTema(tema:Tema): Observable<Tema>{
    return this.http.post<Tema>("http://localhost:8080/tema", tema, this.token)
  }

  editTema(tema: Tema): Observable<Tema>{
    return this.http.put<Tema>("http://localhost:8080/tema", tema, this.token)
  }

  deleteTema(id: number){
    return this.http.delete(`http://localhost:8080/tema/${id}`, this.token)
  }

}
