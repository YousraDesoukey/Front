import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RtServiceService } from '../../rt-service.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements AfterViewInit, OnInit{

  // to set sign in with google or sign up with google in the html
  signText;

  ngOnInit() {
    if (this.signUpIn == 1) {
      this.signText = "Sign Up"
    }
    if (this.signUpIn == 0) {
      this.signText = "Sign In"
    }
  }

  @Input('signUpIn') signUpIn: number;  // 1 for SignUp, 0 for SignIn

  constructor(public service: RtServiceService, public router: Router) { }

  private clientId: string = '1044068226622-b3kfj2vb5qkslmo9s1nj8au9hcbo3r02.apps.googleusercontent.com';

  //scope of permissions asked from user
  private scope = [
    'profile',
    'email',

  ].join(' ');

  public auth2: any;

  public googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(document.getElementById("google"));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let profileJson = {
          "socialID": profile.getId(),
          "name": profile.getName(),
          "image URL": profile.getImageUrl() + '?sz=600',
          "email": profile.getEmail(),
          "provider": "google",
          "token": googleUser.getAuthResponse().id_token
        };
        
        if (this.signUpIn == 1) {

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
            else if (err.status == 503) {
              alert("Please try again later");
            }
            else if (err.status == 401) {
              alert(err.json().error);
              window.location.replace("/login");
            }
          })

        }
        else if (this.signUpIn == 0) {

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
      }
      // , function (error) {
      //   //console.log(JSON.stringify(error, undefined, 2));
      // }
    );
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
