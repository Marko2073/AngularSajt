import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DeleteDto} from "../components/home/home.component";

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private jsonUrl = 'http://localhost:5175/api/tables/';
  private UrlData = 'http://localhost:5175/api/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
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

  getTableData(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.UrlData}${tableName}`);
  }

  insertData(tableName: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.UrlData}${tableName}`, data, { headers });
  }

  updateData(tableName: string, recordId: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.UrlData}${tableName}/${recordId}`, data, { headers });
  }
  deleteRecord(tableName: string, recordId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.UrlData}${tableName}/${recordId}`, { headers });
  }


  getRecordById(tableName: string, recordId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.UrlData}${tableName}/${recordId}`, { headers });
  }
}
