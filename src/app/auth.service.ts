import { Injectable } from '@angular/core';
import { EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// import { firebase } from '@firebase/app';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { UserApp } from './models/services/user';
import firebase from 'firebase/compat';

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user$: firebase.User ;
  user$: Observable<firebase.User | null>;
  //Define custom user object

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private userService: UserService
  ) {



    this.user$ = this.afAuth.authState;
    // afAuth.authState
    //   .subscribe(data => {
    //     console.log('');
    //     this.user$ = data!;
    //   }
    //   );

    //// For FireStore
    // this.user$ = afAuth.authState.pipe(switchMap(user => {
    //   console.log('User0' + (user !== null ? user.displayName : ''));
    //   if (user) {
    //     // this.user$ = user;
    //     // return user;
    //     return this.afs.doc<firebase.User>('users/${user.uid').valueChanges();
    //   } else {
    //     return of(undefined);
    //   }
    //   // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //   // return false;
    // }));

  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  FaceBookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  EmailAuth() {
    return this.AuthLogin(new EmailAuthProvider());
  }
  AuthLogin(provider: any) {
    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    // localStorage.setItem('returnUrl', returnUrl);
    // localStorage.getItem(returnUrl);
    // access Local Storage

    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          this.userService.save(result.user);
          // this.SetUserData(result.user); //For FireStore
        }
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') || '/');
      })
      .catch((error) => {
        console.log('Error' + error);
      })
  }

  logout() {
    this.afAuth.signOut();
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/${user.uid}');

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }

    return userRef.set(data, { merge: true })
  }

  get userApp$(): Observable<UserApp | null> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) return this.userService.get(user!.uid).valueChanges();
        return of(null);
      }));
  }
}
