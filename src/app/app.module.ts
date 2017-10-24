import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { RtServiceService } from './rt-service.service';
import { AppComponent } from './app.component';
import { SocialloginComponent } from './sociallogin/sociallogin.component';

import { Angular2SocialLoginModule } from "angular2-social-login";
import { DashboardComponent } from './dashboard/dashboard.component';

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
    SocialloginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    Angular2SocialLoginModule,
    HttpModule
  ],
  providers: [RtServiceService],
  bootstrap: [AppComponent]
})

export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);