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

  // to submit signUp form and send its inputs to the services
  submitForm(data) {
    this.service.emailSignUp(data.value).subscribe(res => {
      // let a = {"token":"1234"}
        if(res.token) {
            this.service.storeToken(res.token);
            this.router.navigate(['/dashboard']);
        }
  })
}

}
