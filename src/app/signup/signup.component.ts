import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RtServiceService } from '../rt-service.service';
import { Router } from '@angular/router';

import { Directive, forwardRef, Attribute, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public service: RtServiceService, public router:Router){ }  

  ngOnInit() {
  }

  //signIn function call by the button 
  socialSignIn(provider){
    this.service.socialSignIn(provider).subscribe(res => {
      res.subscribe(res => {
        //Argument res is the respond returning from the post which should contain the token if everything is okay
        if(res.token) {
          //storing the token after logging
        this.service.storeToken(res.token);
        console.log(this.service.isLoggedIn());
        // Then We Navigate to the dashboard
          this.router.navigate(['/home']);
      }
        
      })
    });
  }



  // to submit signUp form and send its inputs to the services
  submitForm(data) {
    this.service.emailSignUp(data.value).subscribe(res => {
      let a = {"token":"1234"}
        if(a.token) {
            this.service.storeToken(a.token);
            this.router.navigate(['/home']);
        }
  })
}

}
