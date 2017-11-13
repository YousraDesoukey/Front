import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  token;
  private sub: any;
  
  constructor(private route: ActivatedRoute, private router:Router) {}
  

  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.token = params['token'];
    });

    //check token valid or not
    // destroy token after passchange
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
