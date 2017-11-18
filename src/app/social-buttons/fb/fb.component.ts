import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RtServiceService } from '../../rt-service.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrls: ['./fb.component.css']
})

export class FbComponent implements OnInit {

  constructor(public http: Http, public service: RtServiceService, public router: Router) { }

  // to set sign in with facebook or sign up with facebook in the html
  signText;
  
  ngOnInit() {
    if(this.signUpIn == 1){
      this.signText = "Sign Up"
    }
    if (this.signUpIn == 0) {
      this.signText = "Sign In"
    }
  }

  @Input('signUpIn') signUpIn: number;  // 1 for SignUp, 0 for SignIn


  url = `https://www.facebook.com/v2.11/dialog/oauth?
  client_id=2065091893721004
  &response_type=token
  &scope=public_profile%2Cemail
  &redirect_uri=http%3A%2F%2Flocalhost:4201/fbLogin`;

  getUrl = `https://graph.facebook.com/v2.11/me?fields=name,picture.height(1000).width(1000)%2Cfirst_name%2Clast_name%2Cemail&access_token=`;

  //to activate fb api go to this url//
  //https://forum.bubble.is/t/solved-fb-login-domain-problem/3267/19//

  fbLogin() {
    let Mwidth = window.outerWidth;
    let Mheight = window.outerHeight;
    let Dwidth = 600;
    let Dheight = 600;
    let top = Mheight / 2 - Dheight / 2;
    let left = Mwidth / 2 - Dwidth / 2;
    let specs = "top=" + top + ",left=" + left + ",width=" + Dwidth + ",height=" + Dheight;

    let win = window.open(this.url, "_blank", specs);
    var refreshId = setInterval(() => {
      if (win.location.hash) {
        let info = win.location.hash.substr(1, win.location.hash.length);
        let accessToken = info.split('&')[0].split('=')[1];
        this.getUrl = this.getUrl + accessToken;
        //console.log(win.location.hash);
        this.http.get(this.getUrl).subscribe(res => {
          let resp = res.json();

          let profileJson = {
            "socialID": resp.id,
            "name": resp.name,
            "image URL": resp.picture.data.url,
            "email": resp.email,
            "provider": "facebook",
            "token": accessToken
          };


          if(this.signUpIn == 1){

            this.service.socialSignUp(profileJson).subscribe(res => {
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
              else if(err.status == 503){
                alert("Please try again later");
              }
              else if (err.status == 401) {
                alert(err.json().error);
                window.location.replace("/login");
              }
            })

          }
          else if(this.signUpIn == 0){

            this.service.socialSignIn(profileJson).subscribe(res => {
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
              else if (err.status == 401) {
                alert(err.json().error);
                window.location.replace("/signup");
              }
            })

          }
         
        })


        win.close();
        clearInterval(refreshId);
      }
    }, 500);
  }

  

}
