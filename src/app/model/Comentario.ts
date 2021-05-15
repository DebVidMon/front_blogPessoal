import { Usuario } from './Usuario';
import { Postagem } from './Postagem';

export class Comentario{
  public id: number
  public texto: string
  public data: Date
  public postagem: Postagem
  public usuario: Usuario
}
