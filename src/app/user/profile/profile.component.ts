import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Subscription } from 'rxjs/Subscription';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { FileService } from '../../shared/files/file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [trigger('imageHover',
    [state('hoveringImage', style({
      opacity: 0.3
    })),
      state('notHoveringImage', style({
        opacity: 1
      })),
      transition('hoveringImage <=> notHoveringImage', animate('200ms ease-in'))
    ])]
})
export class ProfileComponent implements OnInit, OnDestroy {


  profileForm: FormGroup;
  user: User;
  userSub: Subscription;
  isHovering: boolean;
  img: string;
  srcLoaded: boolean;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private fileService: FileService) {
    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: '',
      middleName: '',
      lastName: '',
    });
  }

  ngOnInit() {
    this.userSub = this.userService.getUserWithProfileUrl()
      .subscribe(user => {
        this.user = user;
        if (this.user.img) {
          this.img = user.profileImageUrl;
        } else {
          this.img = '/assets/insert_photo.svg';
        }
        this.profileForm.patchValue(user); // patchValue populate the form if the fields match name inside the form
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  save() {
    const model = this.profileForm.value as User;
    model.uid = this.user.uid;
    model.img = this.user.img;
    this.userService.update(model)
      .then(() => {
      this.snackBar.open('User saved...', null, {
          duration: 3000,
        verticalPosition: 'top',
        panelClass: ['snack-color-success']
      });
      })
      .catch(err => {
        this.snackBar.open('Error, User NOT saved - Try again later...', null, {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['snack-color-error']

        });
      });
  }

  fcErr(fc: string, ec: string, pre?: string[]): boolean {
    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.profileForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.profileForm.get(fc).hasError(ec);
  }

  unchanged(): boolean {
    const model = this.profileForm.value as User;
    return model.username === this.user.username &&
      model.firstName === this.user.firstName &&
      model.middleName === this.user.middleName &&
      model.lastName === this.user.lastName;
  }

  hovering(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  uploadNewImage(fileList) {
    // If there is a file, and the index is finding a file.
    // Allow jpg and png.
    // fileList.item checks if any of these types are available.
    // if the index is above -1 it has found one of these two as my type.
    if (fileList && fileList.length === 1 &&
        ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      this.srcLoaded = false;
      const file = fileList.item(0);
      const path = 'profile-images/' + this.user.uid;
      this.fileService.upload(path, file).downloadUrl.subscribe(
        url => {
          this.img = url;
          this.user.img = true;
          this.save();
          this.hovering(false);
        });
    } else {
      this.snackBar.open('Image file has to be a .jpeg or .png', null, {
        duration: 3000
      });
      this.hovering(false);
    }
  }
}
