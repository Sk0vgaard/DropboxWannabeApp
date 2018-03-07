import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './shared/user.service';
import { ProfileComponent } from './profile/profile.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    MatIconModule,
    AngularFirestoreModule
  ],
  declarations: [ProfileComponent],
  providers: [UserService]
})
export class UserModule { }