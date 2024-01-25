import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  base = environment.URL;
  contactURL = `${this.base}contacto/`;

  constructor(private httpClient: HttpClient) {}

  create(contacto: Contacto): Observable<any> {
    return this.httpClient.post<any>(`${this.contactURL}`, contacto);
  }

  getAll(): Observable<Contacto[]> {
    return this.httpClient.get<Contacto[]>(`${this.contactURL}`);
  }

  getDetail(id: number): Observable<Contacto> {
    return this.httpClient.get<Contacto>(`${this.contactURL}${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.contactURL}${id}`);
  }

}
