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
  MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { AuthGaurd } from './shared/auth-gaurd.service';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from './shared/logged-in.guard';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthService, AuthGaurd, LoggedInGuard]
})
export class AuthModule { }
