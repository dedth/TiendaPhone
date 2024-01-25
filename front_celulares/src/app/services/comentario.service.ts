import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Comentario } from '../models/comentario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  base = environment.URL;
  contactURL = `${this.base}comentario/`;

  constructor(private httpClient: HttpClient) {}

  create(comentario: Comentario): Observable<any> {
    return this.httpClient.post<any>(`${this.contactURL}`, comentario);
  }

  getAll(): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(`${this.contactURL}`);
  }

  getDetail(id: number): Observable<Comentario> {
    return this.httpClient.get<Comentario>(`${this.contactURL}${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.contactURL}${id}`);
  }
}
