import { Injectable } from '@angular/core';
import { AuthService } from "angular2-social-login"; //used by social login
import { Http } from '@angular/http'
import 'rxjs/Rx';



@Injectable()
export class RtServiceService {

  constructor(public _auth: AuthService, public http:Http) { }

  //function used to login using Facebook or Google
  //Arg ==> provider is a string representing the provider "facebook" or "google"
  socialSignIn(provider){
    //Args => data is a json string returned from fb or google containing email and token and other info
    return this._auth.login(provider).map(data => {
      //creating body for the post request containing the email, provider and token
      let body = {"email": data["email"] ,"provider":data["provider"],"token":data["token"]}

      //calling the post function 
      return this.socialLoginPost(body);
    });
  }

  //post function for social login to send the email, provider and token
  socialLoginPost(body){
    return this.http.post("http://localhost:3000/profile",body).map(res => res.json());
  }

  //same as the above, we can use one function if the link of post is gonna be the same
  //body would be different tht the bosy of social login
  emailLogin(body){
    return this.http.post("http://localhost:3000/profile",body).map(res => res.json());
  }

  //link should be different when Signing up 
  emailSignUp(body){
    return this.http.post("http://localhost:3000/profile",body).map(res => res.json());
  }

  // function if you forget the password
  //body should contain the email
  //link should be special for forgetting the password
  forgetPassword(body){
    return this.http.post("http://localhost:3000/profile",body).map(res => res.json());
  }

  //signOut function to signOut
  signOut(){
    this.removeToken();
  }

  //store the token in localstorage
  storeToken(token) {
    localStorage.setItem('token',token);
  }

  //remove token from localstorage 
  removeToken() {
    localStorage.removeItem('token');
  }

  //function to check if you are logged or not  
  isLoggedIn() {
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}

