import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { RtServiceService } from '../rt-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  token;
  private sub: any;
  
  constructor(private route: ActivatedRoute, private router:Router, private service:RtServiceService) {}
  

  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.token = params['token'];
    });

    //check token valid or not
    // destroy token after passchange
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //function to send the data by post rquest after adding the token to the json that will be send
  submitForm(data) {
    let json = data.value;
    json["token"] = this.token;

    this.service.changePassword(data.value).subscribe(res => {
      if (res.done) {
        alert("Password has been changed");
        this.router.navigate(['/login']);
      }
    }, err => {

      if (err.status == 400) {
        alert("The Data provided is not valid, please try again later");
      }
      else if (err.status == 503) {
        alert("Token has expired");
        this.router.navigate(['/forgetPassword']);
      }
      else if (err.status == 401) {
        alert(err.json().error);
        this.router.navigate(['/forgetPassword']);
      }

    })



  }
}
