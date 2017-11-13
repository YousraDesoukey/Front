import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RtServiceService } from '../rt-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 constructor(public service: RtServiceService, public router:Router){ }    

  ngOnInit() {
  }

  // to submit login form and send its inputs to the services
  submitForm(data) {
      this.service.emailLogin(data.value).subscribe(res => {
        //test purpos;
        //let a = {"token":"1234"}
          if(res.token) {
              this.service.storeToken(res.token);
              this.router.navigate(['/dashboard']);
          }
    })
}

}
