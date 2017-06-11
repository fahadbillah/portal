import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Login } from './login-data-model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  loginSubmit() {
    console.log(this.loginForm.value);
  }

  loginForm = new FormGroup ({
    userName: new FormControl(),
    password: new FormControl()
  });

}
