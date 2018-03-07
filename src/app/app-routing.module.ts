import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FileSystemComponent } from './home/file-system/file-system.component';
import { AuthModule } from './auth/auth.module';
import { AuthGaurd } from './auth/shared/auth-gaurd.service';
import { LoggedInGuard } from './auth/shared/logged-in.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserModule } from './user/user.module';

// Route setup.
const routes: Routes = [
  { path: '', redirectTo: '/files', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurd]},
  { path: 'files', component: FileSystemComponent, canActivate: [AuthGaurd] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthModule,
    UserModule
  ],
  declarations: [],
  // export RouterModule to whom ever uses it.
  exports: [RouterModule]
})
export class AppRoutingModule { }
