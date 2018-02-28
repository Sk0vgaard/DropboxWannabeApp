import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {

    this.loginForm = fb.group({
        email: '',
        password: ''
    });
  }


  ngOnInit() {
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
      .catch(error => {
        this.snackBar.open(error.message, '', {
          duration: 4000
        });
      });
  }


}
