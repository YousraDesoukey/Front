import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private all:ServicesService) { }

  ngOnInit() {
  }

  // to remove token when user is logged out
  logout() {
    this.all.removeToken();

  }

}
