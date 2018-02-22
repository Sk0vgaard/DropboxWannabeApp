import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routes = [
    {route: '/', title: 'Home', icon: 'home'},
    {route: '/login', title: 'Login', icon: 'lock_open'},
    {route: '/profile', title: 'Profile', icon: 'account_circle'},
    {route: '/files', title: 'Files', icon: 'folder'},
    ];
  navBarOpen = true;


  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }
}
