import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { UserApp } from '../models/services/user';

import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // export class NavbarComponent implements OnDestroy {
  // always unsubscribe forFirebase with async pipe or onDestroy inteface

  userApp!: UserApp;

  constructor(private authService: AuthService) {
    authService.userApp$
      .subscribe(UserApp => {
        return this.userApp = UserApp!;
      });
  }

  logout() {
    this.authService.logout();
  }

}
