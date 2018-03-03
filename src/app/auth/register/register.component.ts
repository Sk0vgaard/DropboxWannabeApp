import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: ''
    });
  }

  register() {
    const model = this.registerForm.value;

    // Register
    this.authService.register(model.email, model.password)
      .then( () => {
        this.router.navigateByUrl('login')
          .then(() => {
            this.snackBar.open('You are now registered...', '', {
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
