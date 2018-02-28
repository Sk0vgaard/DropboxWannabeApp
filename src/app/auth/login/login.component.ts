import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {

  }


  ngOnInit() {
    this.login();
  }

  login() {
      // Log in
      this.authService.login('123@gmail.com', '123456')
        .then( () => console.log('Logged In...'))
        .catch(error => console.log(error));

      this.authService.isAuthenticated()
        .subscribe(authState => console.log(authState),
          error2 => console.log(error2),
          () => console.log('Complete...'));

      console.log('Pressed login');
  }


}
