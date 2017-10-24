import { Injectable } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { Http } from '@angular/http'
import 'rxjs/Rx';



@Injectable()
export class RtServiceService {

  constructor(public _auth: AuthService, public http:Http) { }

  socialSignIn(provider){
    return this._auth.login(provider).map(data => {
      console.log(data);
      let body = {"email": data["email"] ,"provider":data["provider"],"token":data["token"]}
      console.log(body);
      return this.socialLoginPost(body);
    });
  }

  socialLoginPost(body){
    return this.http.post("http://localhost:3000/profile",body).map(res => res.json());
  }

  signOut(){
    this.removeToken();
  }

  storeToken(token) {
    localStorage.setItem('token',token);
  
  }
  removeToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    if(localStorage.getItem('token')) {

      return true;
    } else {
      return false;
    }
  }
}

