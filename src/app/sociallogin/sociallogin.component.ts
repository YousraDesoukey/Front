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

  
  signIn(provider){
    this.service.socialSignIn(provider).subscribe(res => {
      res.subscribe(res=>{
        console.log(res);
        this.service.storeToken(res.token);
        // Then We Navigate to the dashboard
          this.router.navigate(['/dashboard']);
      })
    });
  }


  ngOnInit() {

  }

}
