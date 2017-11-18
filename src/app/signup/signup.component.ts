import { Component, AfterViewInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RtServiceService } from '../rt-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public service: RtServiceService, public router: Router) { }    

  // to submit signUp form and send its inputs to the services
  submitForm(data) {
    this.service.emailSignUp(data.value).subscribe(res => {
      if (res.token) {

        //storing the token after logging
        this.service.storeToken(res.token);

        // Then we redirect to the dashboard
        window.location.replace("/dashboard");
      }
    }, err => {

      if (err.status == 400) {
        alert("The Data provided is not valid, please try again later");
      }
      else if (err.status == 503) {
        alert("Please try again later");
      }
      else if (err.status == 401) {
        alert(err.json().error);
        this.router.navigate(['/login']);
      }
    })

  }
}
