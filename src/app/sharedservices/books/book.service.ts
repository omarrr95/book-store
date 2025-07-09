import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private _HttpClient:HttpClient) { }

  getAllbook():Observable<any> {
    return this._HttpClient.get('api/book');
  }
  addbook(data: { name: string; img: string }): Observable<any> {
    return this._HttpClient.post('api/book', data);
  }
  editbook(data: { name: string; img: string }, id: number): Observable<any> {
    return this._HttpClient.put(`api/book/${id}`, data);
  }
  getbook(id:number): Observable<any> {
    return this._HttpClient.get(`api/book/${id}`);
  }
  deletebook(id: number): Observable<any> {
    return this._HttpClient.delete(`api/book/${id}`);
  }
}
