import { Component, OnInit } from '@angular/core';
import { RtServiceService } from '../rt-service.service';
import { Router } from '@angular/router'
 

@Component({
  selector: 'app-sociallogin',
  templateUrl: './sociallogin.component.html',
  styleUrls: ['./sociallogin.component.css']
})
export class SocialloginComponent implements OnInit {

  constructor(public service: RtServiceService, public router:Router){ }

  //signIn function call by the button 
  signIn(provider){
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
