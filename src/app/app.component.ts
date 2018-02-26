import { Component, OnDestroy } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  routes = [
    {route: '/', title: 'Home', icon: 'home'},
    {route: '/login', title: 'Login', icon: 'lock_open'},
    {route: '/profile', title: 'Profile', icon: 'account_circle'},
    {route: '/files', title: 'Files', icon: 'folder'},
    ];

  navBarOpen = true;
  watcher: Subscription;
  mode = 'side';

  constructor(media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if ( change.mqAlias === 'xs') {
        this.loadMobileContent();
      }else {
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

}
