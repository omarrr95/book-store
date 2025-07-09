import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  language() {
    let currentLang = localStorage.getItem('lang');
    return currentLang;
  }
    userToken() {
    let currentToken = localStorage.getItem('userToken');
    return currentToken;
  }
  constructor(private _httpClient: HttpClient) { }
  onLogin(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'language': this.language() || "en"
    });

    return this._httpClient.post(`api/auth/login`, data, { headers });
  }


  onRegister(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'language': this.language() || "en"
    });
    return this._httpClient.post(`api/auth/register`, data, { headers });
  }
  changePassword(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'language': this.language() || "en",
      'token': this.userToken() || "",
    });
    return this._httpClient.post('api/auth/change-password', data, { headers });
  }

    forgetPassword(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'language': this.language() || "en"
      // 'X-Use-Alt-Base': 'true'
    });
    return this._httpClient.post(`api/auth/forgot-password`, data, { headers });
  }
      resetPassword(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'language': this.language() || "en"
      // 'X-Use-Alt-Base': 'true'
    });
    return this._httpClient.post(`api/auth/reset-password`, data, { headers });
  }
}
