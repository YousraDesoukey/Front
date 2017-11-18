import { Component, OnInit } from '@angular/core';
import { RtServiceService } from '../rt-service.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  constructor(public service: RtServiceService) { }

  ngOnInit() {
  }

  message;
  status;
  style;

  // function to send the email of the user who forgot his password
  submitForm(data) {
    this.service.forgetPassword(data.value).subscribe(res => {
      if(res.done){
        this.message = "Password has been sent successfully .. Please check your email";
        this.style = "alert alert-success"
        this.status = true;
      }
  }, err => {

    if(err.status == 401){
      this.message = err.json().error;
      this.style = "alert alert-danger"
      this.status = true;
    }
    if (err.status == 503) {
      this.message = "Please try again later";
      this.style = "alert alert-danger"
      this.status = true;
    }

  })
}

}
