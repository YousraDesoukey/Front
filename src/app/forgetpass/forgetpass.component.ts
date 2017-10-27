import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  constructor(public service: ServicesService) { }

  ngOnInit() {
  }
  submitForm(data) {
    this.service.forgetPassword(data.value).subscribe(res => {
  })
}

}
