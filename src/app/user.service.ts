import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { UserApp } from './models/services/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }

  save(user: any) {
    this.db.object('/users/' + user.uid).update({
      displayName: user.displayName,
      email: user.email

    });
  }

  get(uid: string): AngularFireObject<UserApp> {
    return this.db.object('/users/' + uid);
  }
}
