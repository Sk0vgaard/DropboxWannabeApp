import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }


  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.fireAuth.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    // AuthState to see if we are authenticated or not.
    return this.fireAuth.authState
    // Instead of getting the whole object from authState,
    // we can with .map return a boolean value by checking if the object !== null.
    // If the object is there return true...
      .map(authState => {
        return authState !== null;
      });
  }

}
