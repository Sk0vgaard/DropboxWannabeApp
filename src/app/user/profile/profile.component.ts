import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Subscription } from 'rxjs/Subscription';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { FileService } from '../../file-system/file.service';

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
        this.img = user.profileImageUrl;
        this.profileForm.patchValue(user); // patchValue populate the form if the fields match name inside the form
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  save() {
    const model = this.profileForm.value as User;
    model.uid = this.user.uid;
    this.userService.update(model)
      .then(() => console.log('saved'))
      .catch(err => console.log('error', err));
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

  changePicture(event) {
    if (event.toState === 'hoveringImage') {
      this.img = '../../../../assets/cloud_upload.svg';
    } else {
      this.img = this.user.profileImageUrl;
    }
    // console.log('animation done, ', event);
  }

  uploadNewImage(fileList) {
    // If there is a file, and the index is finding a file.
    // Allow jpg and png.
    // fileList.item checks if any of these types are available.
    // if the index is above -1 it has found one of these two as my type.
    if (fileList && fileList.length === 1 &&
        ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      const file = fileList.item(0);
      const path = 'profile-images/' + this.user.uid;
      this.fileService.upload(path, file).downloadUrl.subscribe(
        url => {
          this.img = url;
        });
    } else {
      this.snackBar.open('Image file has to be a .jpeg or .png', null, {
        duration: 3000
      });
    }
  }
}
