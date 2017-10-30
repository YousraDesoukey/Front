import { Component, OnInit } from '@angular/core';
import { RtServiceService } from '../rt-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service:RtServiceService, private router:Router) { }

  ngOnInit() {
  }

  //signOut function to remove the token from the localstorage and navigate back to the login page
  signOut(){
    this.service.signOut();
    this.router.navigate(['/']);
  }

}
