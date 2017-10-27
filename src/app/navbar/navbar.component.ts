import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private all:ServicesService) { }

  loggedIn;

  ngOnInit() {
  

  this.loggedIn = this.all.isLoggedIn();
  }

  // to remove token when user is logged out
  logout() {
    this.all.removeToken();
    this.loggedIn = this.all.isLoggedIn();
  }


}
