import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    const JWT = localStorage.getItem('JWT');

    headers.append('Authorization', 'Bearer ' +
      JWT); 
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}