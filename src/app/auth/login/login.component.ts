import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder) {

    this.loginForm = fb.group({
        email: '',
        password: ''
    });
  }


  ngOnInit() {
    // Log in
    this.authService.login('123@gmail.com', '123456')
      .then( () => console.log('Logged In...'))
      .catch(error => console.log(error));

    this.authService.isAuthenticated()
      .subscribe(authState => console.log(authState),
        error2 => console.log(error2),
        () => console.log('Complete...'));
  }

  login() {
      const loginModel = this.loginForm.value;
    // Log in
    this.authService.login(loginModel.email, loginModel.password)
      .then( () => console.log('Logged In...'))
      .catch(error => console.log(error));
  }


}
