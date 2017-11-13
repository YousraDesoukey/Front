import { Component, OnInit } from '@angular/core';
import { RtServiceService } from '../../rt-service.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http'

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {

  constructor(private service: RtServiceService, private http:Http, private router: Router) { }

  ngOnInit() {
  }


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
     let top = Mheight/2 - Dheight/2;
     let left = Mwidth/2 - Dwidth/2;
     let specs = "top=" + top + ",left=" + left + ",width=" + Dwidth + ",height=" + Dheight;

     let win = window.open(this.url, "_blank",specs);
     var refreshId = setInterval(() => {
       if(win.location.hash){
         let info = win.location.hash.substr(1, win.location.hash.length);
         let accessToken = info.split('&')[0].split('=')[1];
         this.getUrl = this.getUrl + accessToken;    
         
         this.http.get(this.getUrl).subscribe(res => {
          let resp = res.json();

          let profileJson = {
            "ID": resp.id, 
            "Name": resp.name, 
            "Image URL": resp.picture.data.url, 
            "Email": resp.email, "provider":"facebook",
            "token": accessToken
          };
          
          console.log(profileJson);
          
          this.service.socialSignIn(profileJson).subscribe(res => {
            if(res.token) {
              //storing the token after logging
            this.service.storeToken(res.token);
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
}
