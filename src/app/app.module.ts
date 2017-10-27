import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { ServicesService } from './services.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent }from './dashboard/dashboard.component';


import { Angular2SocialLoginModule } from "angular2-social-login";

import { EqualValidator } from './equal_validator.directive';
import { ConfirmpassComponent } from './confirmpass/confirmpass.component';
import { SocialloginComponent } from './sociallogin/sociallogin.component';  // import validator

let providers = {
    "google": {
      "clientId": "1044068226622-b3kfj2vb5qkslmo9s1nj8au9hcbo3r02.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "2065091893721004",
      "apiVersion": "v2.10"
    }
  };


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgetpassComponent,
    EqualValidator,
    ConfirmpassComponent,
    SocialloginComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    Angular2SocialLoginModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        {path:'dashboard',component:DashboardComponent},
        { path:'login' , component:LoginComponent},
        { path:'signup' , component:SignupComponent},
        { path:'home' , component:HomeComponent},
        { path:'forgetpass' , component:ForgetpassComponent},
        { path:'' , component:HomeComponent},
        { path:'confirmpass' , component:ConfirmpassComponent}


      ])
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
