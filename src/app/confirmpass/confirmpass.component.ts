import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

import { Directive, forwardRef, Attribute, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';


@Component({
  selector: 'app-confirmpass',
  templateUrl: './confirmpass.component.html',
  styleUrls: ['./confirmpass.component.css']
})
export class ConfirmpassComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
