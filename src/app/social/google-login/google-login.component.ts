import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { RtServiceService } from '../../rt-service.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements AfterViewInit {
  
    private clientId:string = '1044068226622-b3kfj2vb5qkslmo9s1nj8au9hcbo3r02.apps.googleusercontent.com';
    
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
        this.attachSignin(this.element.nativeElement.firstChild);
      });
    }
    
    public attachSignin(element) {
      this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          let profile = googleUser.getBasicProfile();
          let profileJson = {
          "ID": profile.getId(), 
          "Name": profile.getName(), 
          "Image URL": profile.getImageUrl() + '?sz=600', 
          "Email": profile.getEmail(), 
          "provider":"google", 
          "token":googleUser.getAuthResponse().id_token
        };
          
          // debug 
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
          
        }, function (error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
    }
  
    constructor(private element: ElementRef, private service: RtServiceService, private router: Router) {
      //console.log('ElementRef: ', this.element);
    }
  
    ngAfterViewInit() {
      this.googleInit();
    }

}
