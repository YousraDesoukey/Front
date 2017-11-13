import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/Rx';



@Injectable()
export class RtServiceService {

  constructor(public http:Http) { }

  //function used to login using Facebook or Google
  //Arg ==> json containing the data of social user
  socialSignIn(body){
    //console.log(body)
    //calling the post function
    return this.http.post("http://127.0.0.1:8000/usersocial/",body).map(res => res.json());
  }


  /// to this point this function is of no use
  //post function for social login to send the email, provider and token
  private socialLoginPost(body){
    // console.log("works2!")
    console.log(body)
    return this.http.post("http://http://127.0.0.1:8000/logins/",body).map(res => res.json());
  }

  //same as the above, we can use one function if the link of post is gonna be the same
  //body would be different tht the bosy of social login
  emailLogin(body){
    return this.http.post("http://127.0.0.1:8000/login/",body).map(res => res.json());
  }

  //link should be different when Signing up
  emailSignUp(body){
    return this.http.post("http://127.0.0.1:8000/users/",body).map(res => res.json());
  }

  // function if you forget the password
  //body should contain the email
  //link should be special for forgetting the password
  forgetPassword(body){
    return this.http.post("http://127.0.0.1:8000/forgetPassword/",body).map(res => res.json());
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
