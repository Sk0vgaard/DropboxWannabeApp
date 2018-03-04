import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { AuthGaurd } from './shared/auth-gaurd.service';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from './shared/logged-in.guard';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
  ],
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  providers: [AuthService, AuthGaurd, LoggedInGuard]
})
export class AuthModule { }
