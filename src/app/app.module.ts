import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AlbumsListComponent } from './albums/albums-list/albums-list.component';
import { FileSystemModule } from './file-system/file-system.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlbumsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    SharedModule,
    MatIconModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    FileSystemModule
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
