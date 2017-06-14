import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';

import { HttpClient } from '../../services/http-client'
import { Login } from './login.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  http: HttpClient;


  constructor(private fb: FormBuilder, http: HttpClient) { // <--- inject FormBuilder
    this.http = http; 
  }

  ngOnInit() {
    this.buildLoginForm();
  }

  loginSubmit({ value, valid }: { value: Login, valid: boolean }) {
    console.log(value, valid);
    console.log(this.login.value, this.login.valid);

    // this.http.get('http://max-portal.app/api/auth/login')
    // .subscribe((res: Response) => {
    //   console.log(res)
    // })
    this.http.post('http://max-portal.app/api/auth/login', value)
    .subscribe((res) => {
      console.log(res)
    })
    // this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.login = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
