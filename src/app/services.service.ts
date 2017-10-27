import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CanActivate , Router } from '@angular/router';
import { AuthService } from "angular2-social-login"; //used by social login

import 'rxjs/Rx';

@Injectable()
export class ServicesService {

  constructor(private http:Http,private router:Router,public _auth: AuthService) { }

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
  private socialLoginPost(body){
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


  // to store token in the localstorage in the browser
   storeToken(token) {
    localStorage.setItem('token',token);
  }

  // to remove token
   removeToken() {
    localStorage.removeItem('token');
  }

  // checks the user is logged in or not "to show or hide navbar links "
  isLoggedIn() {
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

}
