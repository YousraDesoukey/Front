import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/Rx';



@Injectable()
export class RtServiceService {

  constructor(public http:Http) { }

  //function used to login using Facebook or Google
  //Arg ==> json containing the data of social user
  socialSignUp(body){
    //console.log(body)
    //calling the post function
    return this.http.post("http://127.0.0.1:8000/socialSignUp/", body).map(res => res.json(), err => err.json());
  }


  /// to this point this function is of no use
  //post function for social login to send the email, provider and token
  socialSignIn(body){
    // console.log("works2!")
    //console.log(body)
    return this.http.post("http://127.0.0.1:8000/socialSignIn/", body).map(res => res.json(), err => err.json());
  }

  //same as the above, we can use one function if the link of post is gonna be the same
  //body would be different tht the bosy of social login
  emailLogin(body){
    return this.http.post("http://127.0.0.1:8000/emailSignIn/",body).map(res => res.json(), err => err.json());
  }

  //link should be different when Signing up
  emailSignUp(body){
    return this.http.post("http://127.0.0.1:8000/emailSignUp/",body).map(res => res.json(), err => err.json());
  }

  // function if you forget the password
  //body should contain the email
  //link should be special for forgetting the password
  forgetPassword(body){
    return this.http.post("http://127.0.0.1:8000/forgetPassword/",body).map(res => res.json(), err => err.json());
  }

  changePassword(body){
    return this.http.post("http://127.0.0.1:8000/changePassword/", body).map(res => res.json(), err => err.json());
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
    //we have to check wether the token is valid or not
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
