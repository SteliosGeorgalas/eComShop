import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // export class NavbarComponent implements OnDestroy {
  // always unsubscribe forFirebase with async pipe or onDestroy inteface


  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
