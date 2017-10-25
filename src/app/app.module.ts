import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { RtServiceService } from './rt-service.service';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import {HttpClientModule} from '@angular/common/http';

//pachange used by angular to login using Fb and google
import { Angular2SocialLoginModule } from "angular2-social-login";


//providerINfo //get them from developers
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
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgetpassComponent
  ],
  imports: [
    BrowserModule,
    Angular2SocialLoginModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([ ,// empty string: defult url 
      {path:'dashboard',component:DashboardComponent},
      { path:'login' , component:LoginComponent},
      { path:'signup' , component:SignupComponent},
      { path:'home' , component:HomeComponent},
      { path:'forgetpass' , component:ForgetpassComponent},
      { path:'**' , component:HomeComponent},
      { path:'' , component:HomeComponent},
      ])
  ],
  providers: [RtServiceService],
  bootstrap: [AppComponent]
})

export class AppModule { }

//used to load acripts for social login
Angular2SocialLoginModule.loadProvidersScripts(providers);