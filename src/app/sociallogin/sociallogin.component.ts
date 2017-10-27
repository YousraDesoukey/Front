import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-sociallogin',
  templateUrl: './sociallogin.component.html',
  styleUrls: ['./sociallogin.component.css']
})
export class SocialloginComponent implements OnInit {

  constructor(public service: ServicesService, public router:Router) { }
//signIn function call by the button 
  socialSignIn(provider){
    this.service.socialSignIn(provider).subscribe(res => {
      res.subscribe(res => {
        //Argument res is the respond returning from the post which should contain the token if everything is okay

        //storing the token after logging
        this.service.storeToken(res.token);
        
        // Then We Navigate to the dashboard
          this.router.navigate(['/dashboard']);
      })
    });
}
  ngOnInit() {
  }
  

}
