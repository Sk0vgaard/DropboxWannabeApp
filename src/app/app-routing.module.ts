import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Route setup.
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'page-not-found', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  // export RouterModule to whom ever uses it.
  exports: [RouterModule]
})
export class AppRoutingModule { }
