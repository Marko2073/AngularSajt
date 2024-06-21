import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private jsonUrl = 'http://localhost:5175/api/tables/';
  private UrlData = 'http://localhost:5175/api/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getTables(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getTableColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonUrl}${tableName}`);
  }

  getTableData(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.UrlData}${tableName}`);
  }

  insertData(tableName: string, data: any): Observable<any> {
    const headers = this.getHeaders(); // Retrieve headers with authorization token
    return this.http.post(`${this.UrlData}${tableName}`, data, { headers });
  }
}
