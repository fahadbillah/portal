import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpService } from '../../services/http.service'
import { Login } from './login.interface'
import { CustomResponse } from '../../common/response.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService]
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  http: HttpService;

  constructor(private fb: FormBuilder, http: HttpService) { // <--- inject FormBuilder
    this.http = http; 
  }

  ngOnInit() {
    this.buildLoginForm();
  }

  loginSubmit({ value, valid }: { value: Login, valid: boolean }) {
    console.log(value, valid);
    console.log(this.login.value, this.login.valid);

    this.http.post('http://max-portal.app/api/auth/login', value)
    .map((res:any) => res.json())
    .subscribe(
        data => this.saveJwt(data.token),
        err => this.logError(err)
    );
    // this.buildLoginForm();
  }

  myEvent(event) {
    console.log(event);
    this.http.get('http://max-portal.app/api/employee/profile/593bca6b7b7e0f4ec6b21e6b')
    .subscribe((res) => {
      console.log(res)
    })
  }


  saveJwt(jwt: string) {
    console.log(jwt);
    if(jwt) localStorage.setItem('JWT', jwt)
  }

  logError(err: any) {
    console.log(err);
  }

  buildLoginForm(): void {
    this.login = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
