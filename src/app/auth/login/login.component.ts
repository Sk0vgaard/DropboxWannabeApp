import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {

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
      .then( () => {
        this.router.navigateByUrl('profile')
          .then(() => {
            this.snackBar.open('Your logged in...', '', {
              duration: 3000,
              horizontalPosition: 'center'
            });
          });
      })
      .catch(error => {
        this.snackBar.open(error.message, '', {
          duration: 4000
        });
      });
  }


}
