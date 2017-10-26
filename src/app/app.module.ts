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

import { EqualValidator } from './equal_validator.directive';  // import validator


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgetpassComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        { path:'login' , component:LoginComponent},
        { path:'signup' , component:SignupComponent},
        { path:'home' , component:HomeComponent},
        { path:'forgetpass' , component:ForgetpassComponent},
        { path:'**' , component:HomeComponent},
        { path:'' , component:HomeComponent},


      ])
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
