import { Component, OnInit } from '@angular/core';
import { RtServiceService } from '../rt-service.service';
 

@Component({
  selector: 'app-sociallogin',
  templateUrl: './sociallogin.component.html',
  styleUrls: ['./sociallogin.component.css']
})
export class SocialloginComponent implements OnInit {

  constructor(public service: RtServiceService){ }

  
  signIn(provider){
    this.service.socialSignIn(provider);
  }

  signOut(provider){
    this.service.signOut();
  }

  ngOnInit() {

  }

}
