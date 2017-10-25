import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';


import { Directive, forwardRef, Attribute, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private all:ServicesService,private router:Router) { }

  ngOnInit() {
  }



}
