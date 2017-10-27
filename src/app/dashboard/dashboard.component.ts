import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service:ServicesService, private router:Router) { }

  ngOnInit() {
  }

  //signOut function to remove the token from the localstorage and navigate back to the login page
  signOut(){
    this.service.signOut();
    this.router.navigate(['/']);
  }


}
