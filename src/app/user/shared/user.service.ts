import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/shared/auth.service';
import { User } from './user';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/first';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import { FileService } from '../../file-system/file.service';

@Injectable()
export class UserService {

  constructor(private authService: AuthService,
              private fileService: FileService,
              private afs: AngularFirestore) {
  }

  getUser(): Observable<User> {
    // Get the authUser, using switchMap for returning dbUser and dbUser same time
    return this.authService.getAuthUser() // first() is being used to shutdown the connection afterwards
      .switchMap(authUser => {
        if (!authUser) {
          // Using EmptyObservable to avoid a null reference exception. (gets a null value back).
          return new EmptyObservable();
        }
        return this.afs.doc<User>('users/' + authUser.uid)
          .valueChanges() // an observable that listen and grabbing data from specific user collection, then let me know
          // Merge authUser and dbUser, using Map for merging switchMap and returning it all.
          .map(dbUser => {
            if (dbUser) {
              // Get the dbUser, using switchMap for returning dbUser and authUser same time.
              authUser.username = dbUser.username;
              authUser.firstName = dbUser.firstName;
              authUser.middleName = dbUser.middleName;
              authUser.lastName = dbUser.lastName;
            }
           return authUser;
          });
    });
  }

  getUserWithProfileUrl(): Observable<User> {
    return this.getUser()
      .switchMap(user => {
        return this.fileService.downloadUrlProfile(user.uid)
          .map(url => {
            user.profileImageUrl = url;
            return user;
          });
      });
  }

  update(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid).set(user);
  }
}
