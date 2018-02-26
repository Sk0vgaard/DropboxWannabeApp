import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FileSystemComponent } from './home/file-system/file-system.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthModule } from './auth/auth.module';

// Route setup.
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'files', component: FileSystemComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthModule
  ],
  declarations: [],
  // export RouterModule to whom ever uses it.
  exports: [RouterModule]
})
export class AppRoutingModule { }
