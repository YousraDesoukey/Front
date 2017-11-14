import { Component, AfterViewInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { RtServiceService } from '../rt-service.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  //////////////

  private clientId: string = '1044068226622-b3kfj2vb5qkslmo9s1nj8au9hcbo3r02.apps.googleusercontent.com';

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
          "id": profile.getId(),
          "name": profile.getName(),
          "image URL": profile.getImageUrl() + '?sz=600',
          "email": profile.getEmail(),
          "provider": "google",
          "token": googleUser.getAuthResponse().id_token
        };

        // debug 
        console.log(profileJson);

        this.service.socialSignIn(profileJson).subscribe(res => {
          if (res.token) {
            //storing the token after logging
            this.service.storeToken(res.token);
            console.log(this.service.isLoggedIn());
            // Then We Navigate to the dashboard
            this.router.navigate(['/dashboard']);
          }
        }, err => {
          let a = err._body;
          if (err._body) {
            //storing the token after logging
            this.service.storeToken(a.split(':')[1].split('"')[1]);
            console.log(this.service.isLoggedIn());
            // Then We Navigate to the dashboard
            this.router.navigate(['/dashboard']);
          }
        })

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  //////////////

  constructor(public http:Http, public service: RtServiceService, public router:Router){ }    

  // to submit login form and send its inputs to the services
  submitForm(data) {
      this.service.emailLogin(data.value).subscribe(res => {
          if(res.token) {
              this.service.storeToken(res.token);
              this.router.navigate(['/dashboard']);
          }
    }, err => {
      console.log(err.status);
      alert("Please Sign Up first");
    }
  );
}

/////////////////
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
        
        this.http.get(this.getUrl).subscribe(res => {
          let resp = res.json();

          let profileJson = {
            "id": resp.id,
            "name": resp.name,
            "image URL": resp.picture.data.url,
            "email": resp.email,
            "provider": "facebook",
            "token": accessToken
          };

          console.log(profileJson);

          this.service.socialSignIn(profileJson).subscribe(res => {
            if (res.token) {
              //storing the token after logging
              this.service.storeToken(res.token);
              console.log(this.service.isLoggedIn());
              // Then We Navigate to the dashboard
              this.router.navigate(['/dashboard']);
            }
          }, err => {
            let a = err._body;
            if (err._body) {
              //storing the token after logging
              this.service.storeToken(a.split(':')[1].split('"')[1]);
              console.log(this.service.isLoggedIn());
              // Then We Navigate to the dashboard
              this.router.navigate(['/dashboard']);
            }
          })

        })

        win.close();
        clearInterval(refreshId);
      }
    }, 500);
  }
////////////////


}
