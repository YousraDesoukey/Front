import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CanActivate , Router } from '@angular/router';

import 'rxjs/Rx';

@Injectable()
export class ServicesService {

  constructor(private http:Http,private router:Router) { }


 // to make post request for the user's data to the API and see if he has account or not
 login(data) {
 	return this.http.post('http://192.168.1.16:8000/token/',data).map(res => res.json());

  }


  // for signing up data
  signup(data) {
   return this.http.post('http://192.168.1.16:8000/token/',data).map(res => res.json());

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
