import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Login } from './login.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
  }

  ngOnInit() {
    this.buildLoginForm();
  }

  loginSubmit({ value, valid }: { value: Login, valid: boolean }) {
    console.log(value, valid);
    console.log(this.login.value, this.login.valid);
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.login = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
