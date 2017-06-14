import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTc0Mjg1MzQsImRhdGEiOnsiX2lkIjoiNTkzYmNhNmI3YjdlMGY0ZWM2YjIxZTZiIiwiY3JlYXRlZEF0IjoiMjAxNy0wNi0xMFQxMDozMTowNy4zMDVaIiwidXBkYXRlZEF0IjoiMjAxNy0wNi0xMFQxMDozMTowNy4zMDVaIiwiZmlyc3RfbmFtZSI6IkZhaGFkIiwibGFzdF9uYW1lIjoiQmlsbGFoIiwiZ2VuZGVyIjoibWFsZSIsImFjY291bnRfc3RhdHVzIjoiYWN0aXZlIiwicHJvZmlsZV9waWN0dXJlIjoiaHR0cHM6Ly9zY29udGVudC1zaW42LTEueHguZmJjZG4ubmV0L3YvdDEuMC05LzE3NjMwMTE2XzEwMjExMTc4NzIxMzc2Nzg5XzY5MTQwMjI0NDYyNjg0NzkwNDBfbi5qcGc_b2g9NTUyNDliMGM5NTEzN2Q4ZDlhZWY0NWUzYWE5N2Q3ODUmb2U9NTlFNDI0OEEiLCJfX3YiOjAsImFjY2VzcyI6W10sImNvbnRhY3RfaW5mbyI6eyJlbWFpbCI6ImZhaGFkYmlsbGFoQHlhaG9vLmNvbSJ9fSwiaWF0IjoxNDk3NDI4NDE0fQ.5P5Ir-6ILNS0hubNLGyBlKXpp_gintNluhJJIXnKNYo"); 
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