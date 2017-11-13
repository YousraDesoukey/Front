import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { RtServiceService } from './rt-service.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private service:RtServiceService,private router:Router) { }

  canActivate() {
    
    if(this.service.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}