import { Injectable } from '@angular/core';
import { EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { observable, Observable, switchMap } from 'rxjs';
import { User } from './shared/services/user';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  //Define custom user object

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private userService: UserService
  ) {
    this.user$ =  afAuth.authState;

    //// For FireStore
    // this.user$ = afAuth.authState.pipe(switchMap(user => {
    //   console.log('User0' + (user !== null ? user.displayName : ''));
    //   if (user) {
    //     return this.afs.doc<User>('users/${user.uid').valueChanges();
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
  AuthLogin(provider) {
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

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }

    return userRef.set(data, { merge: true })
  }
}
