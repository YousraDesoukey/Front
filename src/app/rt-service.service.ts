import { Injectable } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { Http } from '@angular/http'



@Injectable()
export class RtServiceService {

  constructor(public _auth: AuthService) { }

  socialSignIn(provider){
    return this._auth.login(provider).subscribe(
      (data) => {
                  console.log(data);
                  //user data
                  //name, image, uid, provider, uid, email, token
                }
    )
  }

  signOut(){
    
  }

}
