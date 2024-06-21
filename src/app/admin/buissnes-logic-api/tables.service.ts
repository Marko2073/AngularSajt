import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private jsonUrl = 'http://localhost:5175/api/tables/';
  private UrlData = 'http://localhost:5175/api/';

  constructor(private http: HttpClient) {}

  getTables(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
  getTableColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonUrl}${tableName}`);
  }
  getTableData(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.UrlData}${tableName}`);
  }
}
