import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ServicesService,private router:Router) { }

  ngOnInit() {
  }

  // to submit login form and send its inputs to the services
  submitForm(data) {
      this.service.emailLogin(data.value).subscribe(res => {
        let a = {"token":"1234"}
          if(a.token) {
              this.service.storeToken(a.token);
              this.router.navigate(['/home']);
          }
    })
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

}
