import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  routes = [
    {route: '/', title: 'Home', icon: 'home'},
    {route: '/profile', title: 'Profile', icon: 'account_circle'},
    {route: '/files', title: 'Files', icon: 'folder'},
    ];

  navBarOpen = true;
  watcher: Subscription;
  mode = 'side';

  constructor(media: ObservableMedia,
              private authService: AuthService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if ( change.mqAlias === 'xs') {
        this.loadMobileContent();
      } else {
        this.loadDashboardContent();
      }
    });
  }

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }

  private loadDashboardContent() {
    this.navBarOpen = true;
    this.mode = 'side';
  }

  loadMobileContent() {
    // Do something special since the viewport is currently
    // using mobile display sizes
    this.navBarOpen = false;
    this.mode = 'over';
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.navBarOpen = isLoggedIn;
    });
  }

}
