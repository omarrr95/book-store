import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class categoryservice {
  language() {
    let currentLang = localStorage.getItem('lang');
    return currentLang;
  }
    userToken() {
    let currentToken = localStorage.getItem('userToken');
    return currentToken;
  }
  constructor(private _HttpClient:HttpClient) { }

  getAllcategory():Observable<any> {
    return this._HttpClient.get('api/category');
  }
  addCategory(data: any): Observable<any> {
        const headers = new HttpHeaders({
      'language': this.language() || "en"
      ,'Authorization':  this.userToken() || ""
    });
    return this._HttpClient.post('api/category', data, { headers });
  }
  editCategory(data: any, id: number): Observable<any> {
    return this._HttpClient.put(`api/category/${id}`, data);
  }
  getcategory(id:number): Observable<any> {
    return this._HttpClient.get(`api/category/${id}`);
  }
  deletecategory(id: number): Observable<any> {
    return this._HttpClient.delete(`api/category/${id}`);
  }
}
