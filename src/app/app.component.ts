import { Component } from '@angular/core';
import { ServicesService } from './services.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SocialloginComponent } from './sociallogin/sociallogin.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
