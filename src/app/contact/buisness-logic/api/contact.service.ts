import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private jsonUrl = 'assets/json/contact.json';

  constructor(private http: HttpClient) {}

  postMessage(objekat:any): Observable<any> {
    return this.http.post<any>(this.jsonUrl,objekat);
  }

}
