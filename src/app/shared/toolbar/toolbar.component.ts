import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output()
  navToggle = new EventEmitter();
  isLoggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(isLogged => {
        this.isLoggedIn = isLogged;
    });
  }

  toggleNav() {
    this.navToggle.emit();
  }

  logout() {
    this.authService.logout();
    console.log('Logged Out...');
  }

}
