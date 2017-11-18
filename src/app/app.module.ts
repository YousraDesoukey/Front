//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';

//services
import { RtServiceService } from './rt-service.service';
import { AuthGuardService } from './auth-guard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EqualValidatorDirective } from './equal-validator.directive';
import { FbComponent } from './social-buttons/fb/fb.component';
import { GoogleComponent } from './social-buttons/google/google.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgetpassComponent,
    ChangePasswordComponent,
    EqualValidatorDirective,
    FbComponent,
    GoogleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuardService]},
      { path:'login' , component:LoginComponent},
      { path:'signup' , component:SignupComponent},
      { path:'home' , component:HomeComponent},
      { path:'forgetPassword' , component:ForgetpassComponent},
      { path:'changePassword/:token' , component:ChangePasswordComponent},
      { path:'**' , redirectTo:'home'},
      { path:'' , redirectTo:'home', pathMatch:'full'}
      ])
  ],
  providers: [RtServiceService, AuthGuardService],
  bootstrap: [AppComponent]
})

export class AppModule { }
