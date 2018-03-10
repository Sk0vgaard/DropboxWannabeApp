import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/shared/auth.service';
import { User } from './user';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/first';

@Injectable()
export class UserService {

  constructor(private authService: AuthService,
              private afs: AngularFirestore) {
  }

  getUser(): Observable<User> {
    // Get the authUser, using switchMap for returning dbUser and dbUser same time
    return this.authService.getAuthUser() // first() is being used to shutdown the connection afterwards
      .switchMap(authUser => {
        return this.afs.doc<User>('users/' + authUser.uid)
          .valueChanges() // an observable that listen and grabbing data from specific user collection, then let me know
          // Merge authUser and dbUser, using Map for merging switchMap and returning it all.
          .map(dbUser => {
            // Get the dbUser, using switchMap for returning dbUser and authUser same time.
            dbUser.uid = authUser.uid;
              dbUser.email = authUser.email;
              return dbUser;
          });
    });
  }

  update(user: User): Promise<any> {
    return this.afs.doc('users/' + user.uid).set(user);
  }
}
