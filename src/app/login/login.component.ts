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

  constructor(private all:ServicesService,private router:Router) { }

  ngOnInit() {
  }

  // to submit login form and send its inputs to the services
  submitForm(data) {
      this.all.login(data.value).subscribe(res => {
          if(res.token) {
              this.all.storeToken(res.token);
              this.router.navigate(['/home']);
          }
    })
}

}
